import instance from '@apis/_axios/instance'
import { deleteToken, getToken, Token } from '@utils/localStorage/token'

export class AuthApi {
  async postLogin(body: LoginForm): Promise<Token> {
    const { data } = await instance.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/login`,
      body,
    );
    return data;
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

  async getMemberProfile(): Promise<Member> {
    const { data } = await instance.get(`/members/me`);
    return data;
  }

  async postFindId(email: string) {
    return await instance.post(`/members/id`, {
      email,
    });
  }

  async postNewPassword(email: string) {
    return await instance.post(`/members/new-password`, {
      email,
    });
  }

  async postLogout() {
    await instance.post('/members/logout');
  }

  async postPassword(password: string) {
    return await instance.patch(`/members/password`, {
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
    const response = await instance.delete('/members');
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
    const response = await instance(`/members/check-email?email=${email}`);
    return response;
  }

  async getCheckId(userId: string) {
    const response = await instance(`/members/check-id?userId=${userId}`);
    return response;
  }

  async getCheckNickname(nickname: string | undefined) {
    const response = await instance(
      `/members/check-nickname?nickname=${nickname}`,
    );
    return response;
  }

  async patchRole() {
    const response = await instance.patch('/members/roles');
    return response;
  }

  async patchInquiry(askId: number, formData: any) {
    const response = await instance.patch(`/members/ask/${askId}`, formData);
    return response;
  }
}

const authApi = new AuthApi();

export default authApi;
