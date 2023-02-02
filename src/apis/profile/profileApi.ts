import instance from '@apis/_axios/instance';
import { InquiryForm, IsNoticeForm, NoticeForm, Role } from './profileApi.type';

export class ProfileApi {
  async patchUserInfo(formData: any) {
    const response = await instance.patch('/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
  async patchArtistInfo(formData: any) {
    const response = await instance.patch('/artists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async getPick(): Promise<pickList> {
    const { data } = await instance.get('/members/preferred-artists');
    return data;
  }
  async getPickDetail(artistId: number): Promise<artistDetail> {
    const { data } = await instance.get(`/artists/${artistId}`);
    return data;
  }
  async postPick(artistId: number) {
    await instance.post(`/members/preferred-artists/${artistId}`);
  }
  async deletePick(artistId: number) {
    await instance.delete(`/members/preferred-artists/${artistId}`);
  }
  async getInquiry(): Promise<InquiryForm> {
    const { data } = await instance.get('/members/ask');
    return data;
  }
  async patchRole(): Promise<Role> {
    const { data } = await instance.patch('/members/roles');
    return data;
  }
  async patchInquiry(askId: number, formData: any) {
    const response = await instance.patch(`/members/ask/${askId}`, formData);
    return response;
  }
  async patchKeyword(body: any) {
    const { data } = await instance.patch('/members/keywords', body);
    return data;
  }
  async getWish(): Promise<WishArtwork> {
    const { data } = await instance.get('/members/preferred-artworks');
    return data;
  }
  async getNotice(): Promise<NoticeForm[]> {
    const { data } = await instance.get('/notifications');
    return data;
  }
  async getIsNotice(): Promise<IsNoticeForm> {
    const { data } = await instance.get('/notifications/new');
    return data;
  }
  async deleteNotice(id: number) {
    const { data } = await instance.delete(`/notifications/${id}`);
    return data;
  }
}

const profileApi = new ProfileApi();

export default profileApi;
