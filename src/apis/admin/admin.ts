import instance from '@apis/_axios/instance';

export class AdminApi {
  async patchRole(memberId: number) {
    const { data } = await instance.patch(`/admin/roles/${memberId}`);
    return data;
  }
  async postAuction(body) {
    console.log(body);
    const { data } = await instance.post('/admin/auction', body);
    return data;
  }
}

const adminApi = new AdminApi();

export default adminApi;
