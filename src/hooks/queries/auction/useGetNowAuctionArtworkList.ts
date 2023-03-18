import auctionApi from '@apis/auction/auctionApi';
import { useQuery } from 'react-query';

const useGetNowAuctionArtworkList = () => {
  return useQuery<NowAuctionArtworkList, Error>(
    'useGetNowAuctionArtworkList',
    () => auctionApi.getNowAuctionArtworkList(),
    {
      refetchOnWindowFocus: false,
      suspense: false,
      useErrorBoundary: false,
    },
  );
};

export default useGetNowAuctionArtworkList;
