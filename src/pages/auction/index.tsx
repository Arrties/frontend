import ArtWorkItem from '@components/auction/ArtWorkItem';
import AuctionNavigate from '@components/auction/AuctionNavigate';
import Timer, { TimerProps } from '@components/auction/Timer';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Tab from '@components/common/Tab';
import useGetNowAuctionArtworkList from '@hooks/queries/auction/useGetNowAuctionArtworkList';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const ArtworkList = tw.div<defaultProps>``;

export default function Auction() {
  const { data, isLoading, error } = useGetNowAuctionArtworkList();
  const [time, setTime] = useState<TimerProps>();

  useEffect(() => {
    if (!data) return;
    const now = moment();
    const endDate = moment(data.endDate, 'YYYY-MM-DD HH:mm:ss');
    const diff = endDate.diff(now, 'seconds');
    const day = Math.floor(diff / (60 * 60 * 24));
    const hour = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
    const minute = Math.floor((diff % (60 * 60)) / 60);
    const second = Math.floor(diff % 60);
    setTime({ day, hour, minute, second });
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Layout>
        <AuctionNavigate />
        <section className="relative mb-7 flex justify-between">
          <span className="text-[20px] font-bold">{`제 ${data?.turn}회 아띠즈 경매`}</span>
          {time && <Timer {...time} />}
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
