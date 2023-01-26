import { useQuery } from 'react-query';
import authApi from '@apis/auth/authApi';

const useGetProfile = () => {
  return useQuery<Member, Error>(
    'useGetProfile',
    () => authApi.getMemberProfile(),
    { retry: false, refetchOnWindowFocus: false },
  );
};

export default useGetProfile;
