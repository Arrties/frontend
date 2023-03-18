import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

const useGetDetail = (artWorkId: number) => {
  return useQuery<ArtworkDetail, Error>(
    ['useGetDetail', artWorkId],
    () => artworkApi.getDetail(artWorkId),
    {
      refetchOnWindowFocus: false,
      enabled: !isNaN(artWorkId),
    },
  );
};

export default useGetDetail;
