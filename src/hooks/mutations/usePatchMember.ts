import { useRouter } from 'next/router';
import profileApi from '@apis/profile/profileApi';
import { useMutation } from 'react-query';

const usePatchUser = () => {
  const router = useRouter();

  return useMutation<any, Error, FormData>(
    'useUserMuation',
    (data) => profileApi.patchUser(data),
    {
      onSuccess: () => {
        router.push('/home');
      },
    },
  );
};

const usePatchArtist = () => {
  const router = useRouter();

  return useMutation<any, Error, FormData>(
    'useArtistMuation',
    (data) => profileApi.patchArtist(data),
    {
      onSuccess: () => {
        router.push('/home');
      },
    },
  );
};

export { usePatchUser, usePatchArtist };
