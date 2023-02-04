import { useQuery } from 'react-query';
import homeApi from '@apis/home/homeApi';
import moment from 'moment';

const useGetAuction = () => {
  return useQuery('useGetAuction', () => homeApi.getAuctionList(), {
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.map((it: AuctionList) => {
        return {
          ...it,
          startDate: moment(it.startDate, 'YYYY-MM-DD-hh-mm-ss'),
          endDate: moment(it.endDate, 'YYYY-MM-DD-hh-mm-ss'),
        };
      });
    },
  });
};

export default useGetAuction;
