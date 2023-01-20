import ArtWorkItem from '@components/auction/ArtWorkItem';
import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React from 'react';
import tw from 'tailwind-styled-components';

const ArtworkList = tw.div``;

export default function Auction() {
  return (
    <>
      <Layout>
        <AuctionNavigate />
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
