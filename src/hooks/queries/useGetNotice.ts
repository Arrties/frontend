import profileApi from '@apis/profile/profileApi';
import { useQuery } from 'react-query';

const useGetNotice = () => {
  return useQuery<Notice[], Error>(
    'useGetNotice',
    () => profileApi.getNotice(),
    {},
  );
};

export default useGetNotice;
