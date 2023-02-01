import ArtWorkItem from '@components/auction/ArtWorkItem';
import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Tab from '@components/common/Tab';
import useGetNowAuctionArtworkList from '@hooks/queries/auction/useGetNowAuctionArtworkList';
import { useCountDown } from '@hooks/useCountDown';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const ArtworkList = tw.div<defaultProps>`
  mb-32
`;

export default function Auction() {
  const { data, isLoading, error } = useGetNowAuctionArtworkList();
  const [date, setDate] = useState('');

  const [hours, minutes, seconds] = useCountDown(date);
  const remaind = +hours + +minutes + +seconds;

  useEffect(() => {
    if (!data) return;
    setDate(data.endDate);
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Layout>
        <AuctionNavigate />
        <section className="relative mb-7 flex justify-between">
          <span className="text-[20px] font-bold">{`제 ${data?.turn}회 아띠즈 경매`}</span>
          {date && (
            <div className="flex w-[100px] items-center justify-center rounded border border-brand px-2">
              <Image
                alt="clock"
                src="/svg/icons/icon_clock_brand.svg"
                width="14"
                height="14"
                className="mr-1"
              />
              {remaind < 0 ? (
                <span className="w-[66px] text-[14px] font-medium tracking-widest">
                  00:00:00
                </span>
              ) : (
                <span className="w-[66px] text-[14px] font-medium tracking-widest">
                  {hours}:{minutes}:{seconds}
                </span>
              )}
            </div>
          )}
        </section>
        <ArtworkList>
          {data?.artWorkList.map((artwork) => (
            <ArtWorkItem
              id={artwork.id}
              key={artwork.id}
              mainImage={artwork.mainImage}
              title={artwork.title}
              topPrice={artwork.topPrice}
              productionYear={artwork.productionYear}
              artWorkSize={artwork.artWorkSize}
              material={artwork.material}
            />
          ))}
        </ArtworkList>
      </Layout>
      <Tab />
    </>
  );
}
