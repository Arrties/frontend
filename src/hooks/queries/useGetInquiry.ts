import { useQuery } from '@tanstack/react-query';
import profileApi from '@apis/profile/profileApi';

export default function useGetInquiry() {
  return useQuery<Inquiry[], Error>(['useGetInquiry'], () =>
    profileApi.getInquiry(),
  );
}
