import profileApi from '@apis/profile/profileApi';
import { useQuery } from '@tanstack/react-query';

const useGetWish = () => {
  return useQuery<WishArtwork[], Error>(['useGetWish'], () =>
    profileApi.getWish(),
  );
};

export default useGetWish;
