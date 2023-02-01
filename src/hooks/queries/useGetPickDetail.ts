import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

const useGetPickDetail = (artistId: number) => {
  return useQuery(
    'useGetPickDetail',
    () => {
      profileApi.getPickDetail(artistId);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetPickDetail;
