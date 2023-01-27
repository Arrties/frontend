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

  async postLogin(body: LoginForm): Promise<Token> {
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
}

const authApi = new AuthApi();

export default authApi;
