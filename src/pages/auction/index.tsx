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
        <section className="relative flex justify-between mb-3">
          <article className=" left-0 text-12 ">작품 17,029</article>
          <article className=" right-0 text-12 flex cursor-pointer ">
            인기순
            <Image
              alt=""
              src="/svg/icons/icon_arrow_sort.svg"
              width="18"
              height="0"
            />
          </article>
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
