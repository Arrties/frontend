import instance from '@apis/_axios/instance'
import axios from 'axios'
import { AxiosInstance } from 'axios'
import { getToken } from '@utils/localStorage/token'

import { AuthDTOType } from './authApi.type'

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async postLogin(body: { userId: string | null; password: string }) {
    try {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/login`,
        body,
      );
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postAccessToken(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios.post('/members/token', body);
    return data;
  }

  async postFindId(email: string) {
    try {
      return await this.axios.post(`/members/id`, {
        email,
      });
    } catch (error: any) {
      if (error) {
        return error;
      }
    }
  }

  async postNewPassword(email: string) {
    try {
      return await this.axios.post(`/members/new-password`, {
        email,
      });
    } catch (error: any) {
      return error;
    }
  }

  async postLogout() {
    await this.axios.post('/members/logout');
  }

  async postPassword(password: string) {
    try {
      return await this.axios.patch(`/members/password`, {
        password,
      });
    } catch (error: any) {
      if (error) {
        return error;
      }
    }
  }

  async patchUserInfo(formData: any) {
    try {
      const token = getToken();
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/members`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token.accessToken,
          },
        },
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async deleteUser() {
    try {
      const res = await this.axios.delete('/members');
      return res;
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async getDuplicateCheck(params) {
    const type = params.queryKey[0];
    const data = params.queryKey[1];
    console.log(type, data);
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
    try {
      const res = await this.axios(`/members/check-id?userId=${userId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  async getCheckNickname(nickname: string) {
    try {
      const res = await this.axios(
        `/members/check-nickname?nickname=${nickname}`,
      );
      return res;
    } catch (error: any) {
      return error;
    }
  }

  async patchRole() {
    try {
      const res = await this.axios.patch('/members/roles');
      return res;
    } catch (error: any) {
      return error;
    }
  }
}

const authApi = new AuthApi();

export default authApi;
