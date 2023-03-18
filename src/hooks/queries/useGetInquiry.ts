import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

export default function useGetInquiry() {
  return useQuery<Inquiry[], Error>(
    'useGetInquiry',
    () => profileApi.getInquiry(),
    {
      refetchOnWindowFocus: false,
    },
  );
}
