import ArtWorkItem from '@components/auction/ArtWorkItem';
import AuctionNavigate from '@components/auction/AuctionNavigate';
import Timer, { TimerProps } from '@components/auction/Timer';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Tab from '@components/common/Tab';
import useGetNowAuctionArtworkList from '@hooks/queries/auction/useGetNowAuctionArtworkList';
import { secondToDate } from '@utils/secondToDate';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const ArtworkList = tw.div<defaultProps>``;

export default function Auction() {
  const { data, isLoading, error } = useGetNowAuctionArtworkList();
  const [date, setDate] = useState<TimerProps>();

  useEffect(() => {
    if (!data) return;
    const now = moment();
    const endDate = moment(data.endDate, 'YYYY-MM-DD HH:mm:ss');
    const diff = endDate.diff(now, 'seconds');
    setDate(secondToDate(diff));
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Layout>
        <AuctionNavigate />
        <section className="relative mb-7 flex justify-between">
          <span className="text-[20px] font-bold">{`제 ${data?.turn}회 아띠즈 경매`}</span>
          {date && <Timer {...date} />}
        </section>
        <ArtworkList>
          <ArtWorkItem />
          <ArtWorkItem />
          <ArtWorkItem />
        </ArtworkList>
      </Layout>
      <Tab />
    </>
  );
}
