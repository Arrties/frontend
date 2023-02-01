import auctionApi from '@apis/auction/auctionApi';
import { useQuery } from 'react-query';

const useGetNowAuctionArtworkList = () => {
  return useQuery<NowAuctionArtworkList, Error>(
    'useGetNowAuctionArtworkList',
    () => auctionApi.getNowAuctionArtworkList(),
    { retry: false, refetchOnWindowFocus: false },
  );
};

export default useGetNowAuctionArtworkList;
