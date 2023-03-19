import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

const useGetPickDetail = (artistId: number) => {
  return useQuery<artistDetail, Error>(
    ['useGetPickDetail', artistId],
    () => profileApi.getPickDetail(artistId),

    {
      retry: 0,

      enabled: !isNaN(artistId),
    },
  );
};

export default useGetPickDetail;
