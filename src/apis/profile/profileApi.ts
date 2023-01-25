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

export class ProfileApi {
  async getInquiry(): Promise<InquiryForm> {
    const { data } = await instance.get('/members/ask');
    return data;
  }
}

const profileApi = new ProfileApi();

export default profileApi;
