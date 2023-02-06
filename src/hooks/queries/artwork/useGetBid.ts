import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

const useGetBid = () => {
  return useQuery<BidArtwork, Error>('useGetBid', () => artworkApi.getBid(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetBid;
