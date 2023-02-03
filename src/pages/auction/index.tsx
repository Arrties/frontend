import ArtWorkItem from '@components/auction/ArtWorkItem';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import NoticeIcon from '@components/common/NoticeIcon';
import Loader from '@components/common/Loader';
import Tab from '@components/common/Tab';
import useGetNowAuctionArtworkList from '@hooks/queries/auction/useGetNowAuctionArtworkList';
import { useCountDown } from '@hooks/useCountDown';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

const ArtworkList = tw.div<defaultProps>`
  mb-32
`;

export default function Auction() {
  const router = useRouter();
  const { data, isLoading, error } = useGetNowAuctionArtworkList();
  const [date, setDate] = useState('');

  const [hours, minutes, seconds] = useCountDown?.(date);
  const remaind = +hours + +minutes + +seconds;

  useEffect(() => {
    if (!data) return;
    setDate(data.endDate);
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Layout>
        <Navigate
          left_message={
            <Image
              alt="logo"
              src="/svg/icons/icon_logo.svg"
              width="90"
              height="0"
            />
          }
          handleLeftButton={() => {
            router.push('/home');
          }}
          right_message={<NoticeIcon />}
        />
        <div className="top-100px absolute inset-x-0 mx-auto  max-w-[420px] border-b border-brand" />
        {error && error.code === 'NOT_FOUND_AUCTION_PROCESSING' ? (
          <div className="mt-[100%] flex flex-col items-center justify-center">
            <Image
              alt="auction"
              src="/svg/icons/auction/icon_auction_gray.svg"
              width="54"
              height="54"
            />
            <p className="mt-3 text-16 font-medium text-[#999999]">
              아직 진행중인 경매가 없어요
            </p>
          </div>
        ) : (
          <>
            <section className="relative mb-7 mt-4 flex justify-between">
              <span className="text-[20px] font-bold">{`제 ${data?.turn}회 아띠즈 경매`}</span>
              {date && (
                <div
                  className={`flex ${
                    +hours >= 24 ? 'w-fit' : 'w-[100px]'
                  } items-center justify-center rounded bg-brand px-2 text-white`}
                >
                  <Image
                    alt="clock"
                    src="/svg/icons/icon_clock_white.svg"
                    width="14"
                    height="14"
                    className="mr-1.5"
                  />
                  {remaind < 0 ? (
                    <span className="w-[66px] text-[14px] font-medium tracking-widest">
                      00:00:00
                    </span>
                  ) : (
                    <span
                      className={`${
                        +hours >= 24 ? 'w-fit' : 'w-[66px]'
                      } text-[14px] font-medium tracking-widest`}
                    >
                      {+hours >= 24
                        ? 'D-' + Math.floor(+hours / 24)
                        : hours + ':' + minutes + ':' + seconds}{' '}
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
