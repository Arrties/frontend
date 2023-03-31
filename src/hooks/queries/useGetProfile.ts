import { useQuery } from 'react-query';
import authApi from '@apis/auth/authApi';
import { useRouter } from 'next/router';
const useGetProfile = () => {
  const router = useRouter();
  return useQuery<Member, Error>(
    'useGetProfile',
    () => authApi.getMemberProfile(),
    {
      onSuccess: (data) => {
        if (!data.telephone) {
          router.push('/profile/edit');
        }
      },
    },
  );
};

export default useGetProfile;
