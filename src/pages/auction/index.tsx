import ArtWorkItem from '@components/auction/ArtWorkItem';
import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';

const ArtworkList = tw.div<DefaultProps>``;

interface DefaultProps {
  [key: string]: any;
}

export default function Auction() {
  return (
    <>
      <Layout>
        <AuctionNavigate />
        <section className="relative mb-7 flex justify-between">
          <span className="text-[20px] font-bold">제 1회 아띠즈 경매</span>
          <div className=" flex items-center rounded border border-brand px-2">
            <Image
              alt=""
              src="/svg/icons/icon_clock_brand.svg"
              width="14"
              height="0"
              className="mr-1"
            />
            <span className="text-[14px] font-bold">08:20:03</span>
          </div>
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
