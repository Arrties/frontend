import auctionApi from '@apis/auction/auctionApi';
import { useQuery } from 'react-query';

const useGetBiddingHistory = (artworkId: number) => {
  return useQuery<BiddingHistory, Error>(
    'useGetBiddingHistory',
    () => auctionApi.getBiddingHistory(artworkId),
    { retry: false, refetchOnWindowFocus: false },
  );
};

export default useGetBiddingHistory;
