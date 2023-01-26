import axios from 'axios';
import { getToken, setToken } from '@utils/localStorage/token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const refreshToken = async () => {
  const refreshToken = getToken().refreshToken;
  const response = await axios.post('/members/token', {
    refreshToken,
  });
  return response.data;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: token.accessToken,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config: originalRequest, response } = error;
    const { status, data } = response;
    const isUnAuthError = status === 401;
    const isNotFoundError = status === 404;
    const isDuplicateError = status === 409;

    if (isNotFoundError) {
      return Promise.reject(error.response.data);
    }

    if (isDuplicateError) {
      return Promise.reject(error.response.data);
    }

    if (isUnAuthError) {
      if (data?.code === 'TOKEN_INVALID') {
        alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
        window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/auth/login`;
        return;
      }

      if (data?.code === 'TOKEN_EXPIRED') {
        const { accessToken } = await refreshToken();
        setToken({
          accessToken,
          refreshToken: getToken().refreshToken,
          roles: getToken().roles,
        });
        return instance.request(originalRequest);
      }

      return Promise.reject(error.response.data);
    }
  },
);

export default instance;
