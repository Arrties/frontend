import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import useGetMyArtWork from '@hooks/queries/artwork/useGetMyArtWork';
import SellingArtItem from '@components/profile/selling/SellingArtItem';

export default function Selling() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleOption = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };
  const handleAccept = () => {
    console.log('수정/삭제');
  };
  const { data } = useGetMyArtWork();
  return (
    <Layout>
      <Modal
        isModal={isModal}
        isMain
        onCloseModal={handleCloseModal}
        message="경매 중으로 넘어간 작품은 수정/삭제가 불가능 합니다."
        denyMessage="수정"
        className="top-5"
        onAccept={handleAccept}
      />
      <Navigate isRightButton={false} message="판매활동" />
      <Tab.Group>
        <Tab.List className="w-full  text-14 ">
          <Tab className="h-[52px] w-1/3 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            등록된 작품
          </Tab>
          <Tab className="h-[52px] w-1/3 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            경매 중
          </Tab>
          <Tab className="h-[52px] w-1/3 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            경매 완료
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {data
              ?.filter((item) => item.auctionStatus === 'registered')
              .map((item) => (
                <SellingArtItem
                  key={item.id}
                  biddingItem={item}
                  auctionStatus="registered"
                  handleOption={handleOption}
                />
              ))}
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels>
          <Tab.Panel>
            {/* <ArtItem
              lastChild={
                <span className="text-14 font-bold text-[#FC6554]">
                  입찰 현황 : 450,000원
                </span>
              }
              handleOption={handleOption}
            />
            <ArtItem
              lastChild={
                <span className="text-14 font-bold text-[#FC6554]">
                  입찰 현황 : 입찰없음
                </span>
              }
              handleOption={handleOption}
            /> */}
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels>
          <Tab.Panel>{/* <ArtItem handleOption={handleOption} /> */}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
