import auctionApi from '@apis/auction/auctionApi';
import { useQuery } from 'react-query';

const useGetBiddingHistory = (artWorkId: number) => {
  return useQuery<BiddingHistory, Error>(
    ['useGetBiddingHistory', artWorkId],
    () => auctionApi.getBiddingHistory(artWorkId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !isNaN(artWorkId),
    },
  );
};

export default useGetBiddingHistory;
