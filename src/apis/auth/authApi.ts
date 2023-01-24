import instance from '@apis/_axios/instance';
import { AxiosInstance } from 'axios';
import { deleteToken, getToken, setToken } from '@utils/localStorage/token';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async postLogin(body: { userId: string | null; password: string }) {
    return await instance.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/login`,
      body,
    );
  }

  async postRefreshToken(): Promise<any> {
    const refreshToken = getToken().refreshToken;
    try {
      const response = await instance.post('/members/token', {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      deleteToken();
      window.location.href = '/auth/login';
    }
  }

  async postFindId(email: string) {
    return await this.axios.post(`/members/id`, {
      email,
    });
  }

  async postNewPassword(email: string) {
    return await this.axios.post(`/members/new-password`, {
      email,
    });
  }

  async postLogout() {
    await this.axios.post('/members/logout');
  }

  async postPassword(password: string) {
    return await this.axios.patch(`/members/password`, {
      password,
    });
  }

  async patchUserInfo(formData: any) {
    return await instance.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
  async patchArtistInfo(formData: any) {
    const res = await instance.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/artists`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  }
  async patchKeyword(body: string[]) {
    const res = await instance.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/keywords`,
      body,
    );
    return res;
  }

  async deleteUser() {
    const res = await this.axios.delete('/members');
    return res;
  }

  async getDuplicateCheck(params) {
    const type = params.queryKey[0];
    const data = params.queryKey[1];
    let uri = '';
    if (type === 'email') {
      uri = '/members/check-email?email=';
    } else if (type === 'id') {
      uri = '/members/check-id?userId=';
    } else if (type === 'nickname') {
      uri = '/members/check-nickname?nickname=';
    }
    const res = await instance(`${uri}${data}`);
    return res;
  }

  async getCheckEmail(email: string) {
    const res = await this.axios(`/members/check-email?email=${email}`);
    return res;
  }

  async getCheckId(userId: string) {
    const res = await this.axios(`/members/check-id?userId=${userId}`);
    return res;
  }

  async getCheckNickname(nickname: string | undefined) {
    const res = await this.axios(
      `/members/check-nickname?nickname=${nickname}`,
    );
    return res;
  }

  async patchRole() {
    const res = await this.axios.patch('/members/roles');
    return res;
  }
}

const authApi = new AuthApi();

export default authApi;
