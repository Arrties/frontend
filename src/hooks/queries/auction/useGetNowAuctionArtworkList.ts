import auctionApi from '@apis/auction/auctionApi';
import { useQuery } from '@tanstack/react-query';

const useGetNowAuctionArtworkList = () => {
  return useQuery<NowAuctionArtworkList, Error>(
    ['useGetNowAuctionArtworkList'],
    () => auctionApi.getNowAuctionArtworkList(),
    {
      suspense: false,
      useErrorBoundary: false,
    },
  );
};

export default useGetNowAuctionArtworkList;
