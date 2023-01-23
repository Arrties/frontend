import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import ArtItem from '@components/profile/ArtItem';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import useGetSellingArtWork from '@hooks/queries/useGetSellingArtWork';

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
  const { sellingArtWork } = useGetSellingArtWork();
  console.log(sellingArtWork);
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
          <Tab className="w-1/3 ui-selected:border-b-2 border-[#191919] ui-not-selected:text-[#DBDBDB] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b">
            등록된 작품
          </Tab>
          <Tab className="w-1/3 ui-selected:border-b-2 border-[#191919] ui-not-selected:text-[#DBDBDB] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b">
            경매 중
          </Tab>
          <Tab className="w-1/3 ui-selected:border-b-2 border-[#191919] ui-not-selected:text-[#DBDBDB] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b">
            경매 완료
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ArtItem handleOption={handleOption} />
            <ArtItem handleOption={handleOption} />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels>
          <Tab.Panel>
            <ArtItem
              lastChild={
                <span className="text-[#FC6554] text-14 font-bold">
                  입찰 현황 : 450,000원
                </span>
              }
              handleOption={handleOption}
            />
            <ArtItem
              lastChild={
                <span className="text-[#FC6554] text-14 font-bold">
                  입찰 현황 : 입찰없음
                </span>
              }
              handleOption={handleOption}
            />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels>
          <Tab.Panel>
            <ArtItem
              lastChild={
                <p>
                  <span className="text-10 text-[#FFF] bg-[#767676] px-1 py-0.5 rounded">
                    배송완료
                  </span>
                  <span className="text-14 text-[#F5535D] font-bold ml-1">
                    입찰없음
                  </span>
                </p>
              }
              handleOption={handleOption}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
