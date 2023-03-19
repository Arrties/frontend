import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

const useGetBid = () => {
  return useQuery<BidArtwork, Error>(
    'useGetBid',
    () => artworkApi.getBid(),
    {},
  );
};

export default useGetBid;
