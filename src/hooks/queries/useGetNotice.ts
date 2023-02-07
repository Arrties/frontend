import profileApi from '@apis/profile/profileApi';
import { useQuery } from 'react-query';

const useGetNotice = () => {
  return useQuery<Notice[], Error>(
    'useGetNotice',
    () => profileApi.getNotice(),
    {
      retry: false,
    },
  );
};

export default useGetNotice;
