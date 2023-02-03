import { useQuery } from 'react-query';
import homeApi from '@apis/home/homeApi';
import { useState } from 'react';
import moment from 'moment';

const useGetAuction = () => {
  const [auctionList, setAuctionList] = useState<AuctionList[]>();
  const query = useQuery('useGetAuction', () => homeApi.getAuctionList(), {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const newAuctionList = data.map((it: AuctionList) => {
        return {
          ...it,
          startDate: new Date(
            moment(it.startDate, 'YYYY-MM-DD-hh-mm-ss').format('LLLL'),
          ),
          endDate: new Date(
            moment(it.endDate, 'YYYY-MM-DD-hh-mm-ss').format('LLLL'),
          ),
        };
      });
      setAuctionList(newAuctionList);
    },
  });
  return { ...query, auctionList };
};

export default useGetAuction;
