import auctionApi from '@apis/auction/auctionApi';
import { useMutation } from 'react-query';

const usePutBiddng = (artWorkId: number) => {
  return useMutation<any, Error, BiddingRequest>(
    'useKeywordMuation',
    ({ price }) => auctionApi.putBidding(artWorkId, price),
  );
};
export default usePutBiddng;
