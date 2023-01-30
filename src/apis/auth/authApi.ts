import instance from '@apis/_axios/instance';
import { Token } from '@utils/localStorage/token';

export class AuthApi {
  async getMemberProfile(): Promise<Member> {
    const { data } = await instance.get(`/members/me`);
    return data;
  }

  async postMember(body: Member): Promise<Member> {
    const { data } = await instance.post('/members/join', body);
    return data;
  }

  async postLogin(body: Login): Promise<Token> {
    const { data } = await instance.post('/members/login', body);
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

  async deleteUser() {
    const response = await instance.delete('/members');
    return response;
  }

  async getCheckId(userId: string) {
    await instance(`/members/check-id?userId=${userId}`);
  }

  async getCheckEmail(email: string) {
    await instance(`/members/check-email?email=${email}`);
  }

  async getCheckNickname(nickname: string | undefined) {
    await instance(`/members/check-nickname?nickname=${nickname}`);
  }
}

const authApi = new AuthApi();

export default authApi;
