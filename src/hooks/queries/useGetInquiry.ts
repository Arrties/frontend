import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

interface InquiryForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}

export default function useGetInquiry() {
  return useQuery<InquiryForm, Error>('useInquiry', () =>
    profileApi.getInquiry(),
  );
}
