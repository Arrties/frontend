import profileApi from '@apis/profile/profileApi';
import { NoticeForm } from '@apis/profile/profileApi.type';
import { useQuery } from 'react-query';

const useGetNotice = () => {
  return useQuery<NoticeForm[], Error>(
    'useGetNotice',
    () => profileApi.getNotice(),
    {
      retry: false,
    },
  );
};

export default useGetNotice;
