import instance from '@apis/_axios/instance';

interface InquiryForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}

interface RoleForm {
  roles: string;
}
export class ProfileApi {
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

  async getInquiry(): Promise<InquiryForm> {
    const { data } = await instance.get('/members/ask');
    return data;
  }
  async patchRole(): Promise<RoleForm> {
    const { data } = await instance.patch('/members/roles');
    return data;
  }
  async patchInquiry(askId: number, formData: any) {
    const response = await instance.patch(`/members/ask/${askId}`, formData);
    return response;
  }
  async patchKeyword(body: string[]) {
    const response = await instance.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/keywords`,
      body,
    );
    return response;
  }
}

const profileApi = new ProfileApi();

export default profileApi;
