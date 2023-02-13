import instance from '@apis/_axios/instance';

export class AdminApi {
  async patchRole(memberId: number) {
    await instance.patch(`/admin/roles/${memberId}`);
  }
  async postAuction(body) {
    await instance.post('/admin/auction', body);
  }
  async getCertificationList() {
    const { data } = await instance.get('/admin/members/certification');
    return data;
  }
  async getAsk() {
    const { data } = await instance.get('/admin/members/ask');
    return data;
  }
  async postAnswer(id: number, body: { answer: string }) {
    await instance.patch(`/admin/members/answer/${id}`, body);
  }
}

const adminApi = new AdminApi();

export default adminApi;
