import instance from '@apis/_axios/instance';
import { AxiosInstance } from 'axios';
import { deleteToken, getToken } from '@utils/localStorage/token';

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
    const response = await instance.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/artists`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  }
  async patchKeyword(body: string[]) {
    const response = await instance.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/keywords`,
      body,
    );
    return response;
  }

  async deleteUser() {
    const response = await this.axios.delete('/members');
    return response;
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
    const response = await instance(`${uri}${data}`);
    return response;
  }

  async getCheckEmail(email: string) {
    const response = await this.axios(`/members/check-email?email=${email}`);
    return response;
  }

  async getCheckId(userId: string) {
    const response = await this.axios(`/members/check-id?userId=${userId}`);
    return response;
  }

  async getCheckNickname(nickname: string | undefined) {
    const response = await this.axios(
      `/members/check-nickname?nickname=${nickname}`,
    );
    return response;
  }

  async patchRole() {
    const response = await this.axios.patch('/members/roles');
    return response;
  }
}

const authApi = new AuthApi();

export default authApi;
