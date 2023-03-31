import profileApi from '@apis/profile/profileApi';
import { useMutation } from '@tanstack/react-query';

const usePatchUser = () => {
  return useMutation<any, Error, FormData>(['useUserMuation'], (data) =>
    profileApi.patchUser(data),
  );
};

const usePatchArtist = () => {
  return useMutation<any, Error, FormData>(['useArtistMuation'], (data) =>
    profileApi.patchArtist(data),
  );
};

export { usePatchUser, usePatchArtist };
