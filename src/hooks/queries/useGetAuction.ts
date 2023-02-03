import { useQuery } from 'react-query';
import homeApi from '@apis/home/homeApi';

const useGetAuction = () => {
  return useQuery('useGetAuction', () => homeApi.getAuctionList(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAuction;
