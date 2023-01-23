import axios from 'axios';
import { deleteToken, getToken, setToken } from '@utils/localStorage/token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const refreshToken = async () => {
  const refresh = getToken().refreshToken;
  try {
    const res = await axios.post('/members/token', {
      refreshToken: refresh,
    });
    return res?.data;
  } catch (error) {
    deleteToken();
    window.location.href = '/auth/login';
  }
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
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    const { response: res, config: reqData } = error || {};
    const { status } = res || {};
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
      try {
        const token = await refreshToken();
        token['roles'] = getToken().roles;
        token['refreshToken'] = getToken().refreshToken;
        if (token?.accessToken) {
          setToken(token);
          reqData.headers.Authorization = token?.access;
          return instance(reqData);
        }
        return instance.request(originalRequest);
      } catch (error) {
        alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
      }
    }
  },
);

// export { setAuthorHeader, unsetAuthorHeader };

export default instance;
