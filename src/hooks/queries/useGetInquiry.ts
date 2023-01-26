import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

interface Inquiry {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}

export default function useGetInquiry() {
  return useQuery<any, Error>('useInquiry', () => profileApi.getInquiry());
}
