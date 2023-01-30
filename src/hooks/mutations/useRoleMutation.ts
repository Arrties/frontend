import { useRouter } from 'next/router';
import { getToken, setToken } from '@utils/localStorage/token/index';
import profileApi from '@apis/profile/profileApi';
import { Role } from '@apis/profile/profileApi.type';
import { useMutation } from 'react-query';

const useRoleMutation = () => {
  const router = useRouter();
  return useMutation<Role, Error>(
    'useRoleMuation',
    () => profileApi.patchRole(),
    {
      onSuccess: (data) => {
        const token = getToken();
        setToken({
          ...token,
          roles: data.roles,
        });
        router.push('/profile/register/complete');
      },
    },
  );
};
export default useRoleMutation;
