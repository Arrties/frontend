import profileApi from '@apis/profile/profileApi';
import { useQuery } from 'react-query';

const useGetNotice = () => {
  return useQuery<any, Error>('useGetNotice', () => profileApi.getNotice(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetNotice;
