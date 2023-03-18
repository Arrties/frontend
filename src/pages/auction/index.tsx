import ArtWorkItem from '@components/auction/ArtWorkItem';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import NoticeIcon from '@components/common/NoticeIcon';
import Tab from '@components/common/Tab';
import useGetNowAuctionArtworkList from '@hooks/queries/auction/useGetNowAuctionArtworkList';
import { useCountDown } from '@hooks/useCountDown';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import None from '@components/common/None';

const ArtworkList = tw.div<defaultProps>`
  mb-32
`;

export default function Auction() {
  const router = useRouter();
  const { data, error } = useGetNowAuctionArtworkList();
  const [date, setDate] = useState('');

  const [days, hours, minutes, seconds] = useCountDown?.(date);

  const remaind = +hours + +minutes + +seconds;

  useEffect(() => {
    if (!data) return;
    setDate(data.endDate);
  }, [data]);

  return (
    <>
      <Layout>
        <Navigate
          left_message={
            <Image alt="logo" src="/svg/icons/logo.svg" width="90" height="0" />
          }
          handleLeftButton={() => {
            router.push('/home');
          }}
          right_message={<NoticeIcon />}
        />
        <div className="top-6.25rem absolute inset-x-0 mx-auto  max-w-[26.25rem] border-b border-brand" />
        {error && error.code === 'NOT_FOUND_AUCTION_PROCESSING' ? (
          <None path="auction" message="아직 진행중인 경매가 없어요" />
        ) : (
          <>
            <section className="relative mb-7 mt-4 flex justify-between">
              {data && (
                <span className="text-[1.25rem] font-bold">{`제 ${data?.turn}회 아띠즈 경매`}</span>
              )}
              {date && !Number.isNaN(+days) && (
                <div
                  className={`flex ${
                    +days >= 1 ? 'w-fit' : 'w-[6.25rem]'
                  } items-center justify-center rounded bg-brand px-2 text-white`}
                >
                  <Image
                    alt="clock"
                    src="/svg/icons/clock_white.svg"
                    width="14"
                    height="14"
                    className="mr-1.5"
                  />
                  {remaind < 0 ? (
                    <span className="w-[4.125rem] text-[0.875rem] font-medium tracking-widest">
                      00:00:00
                    </span>
                  ) : (
                    <span
                      className={`${
                        +days >= 1 ? 'w-fit' : 'w-[4.125rem]'
                      } text-[0.875rem] font-medium tracking-widest`}
                    >
                      {+days >= 1
                        ? 'D-' + days
                        : hours + ':' + minutes + ':' + seconds}
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
          </>
        )}
      </Layout>
      <Tab />
    </>
  );
}
