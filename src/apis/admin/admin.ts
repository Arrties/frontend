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
}

const adminApi = new AdminApi();

export default adminApi;
