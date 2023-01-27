import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

const useGetDetail = (artWorkId: number) => {
  return useQuery<any, Error>(
    'useGetDetail',
    () => artworkApi.getDetail(artWorkId),
    { retry: false, refetchOnWindowFocus: false },
  );
};

export default useGetDetail;
