import auctionApi from '@apis/auction/auctionApi';
import { useQuery } from '@tanstack/react-query';

const useGetBiddingHistory = (artWorkId: number) => {
  return useQuery<BiddingHistory, Error>(
    ['useGetBiddingHistory', artWorkId],
    () => auctionApi.getBiddingHistory(artWorkId),
    {
      enabled: !!artWorkId,
    },
  );
};

export default useGetBiddingHistory;
