import { queryClient } from 'pages/_app';
import auctionApi from '@apis/auction/auctionApi';
import { useMutation } from '@tanstack/react-query';

const usePutBiddng = (artWorkId: number) => {
  return useMutation<any, Error, BiddingRequest>(
    ['usePutBiddng'],
    ({ price }) => auctionApi.putBidding(artWorkId, price),
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetBiddingHistory'],
        });
      },
    },
  );
};
export default usePutBiddng;
