import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import SuccessBidArtItem from '@components/profile/SuccessBidArtItem';
import BidArtItem from '@components/profile/BidArtItem';
import { Tab } from '@headlessui/react';
import useGetBid from '@hooks/queries/artwork/useGetBid';
import React from 'react';

export default function bid() {
  const { data: bidList } = useGetBid() || {};
  return (
    <Layout>
      <Navigate isRightButton={false} message="나의 경매" />
      <Tab.Group>
        <Tab.List>
          <Tab className="h-[52px] w-1/2 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            입찰내역
          </Tab>
          <Tab className="h-[52px] w-1/2 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            낙찰내역
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="space-y-8">
            {bidList?.biddingList.map((biddingItem: BidArtworkForm) => (
              <BidArtItem key={biddingItem?.id} biddingItem={biddingItem} />
            ))}
          </Tab.Panel>
          <Tab.Panel className="space-y-6">
            {bidList?.successfulBiddingList.map(
              (biddingItem: SuccessfulBidArtworkForm) => (
                <SuccessBidArtItem
                  key={biddingItem?.id}
                  biddingItem={biddingItem}
                />
              ),
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
