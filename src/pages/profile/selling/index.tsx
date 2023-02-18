import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import useGetMyArtWork from '@hooks/queries/artwork/useGetMyArtWork';
import SellingItem from '@components/profile/selling/SellingItem';
import { useRouter } from 'next/router';
import None from '@components/common/None';
import SellingModal from '@components/profile/selling/SellingModal';

export default function Selling() {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [thisId, setThisId] = useState<number>(0);

  const handleOption = (e) => {
    console.log(1);
    e.stopPropagation();
    setThisId(e.target.id);
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };

  const {
    data: [registered, processing, sales_finished],
  } = useGetMyArtWork();

  return (
    <Layout>
      {isModal && (
        <SellingModal
          onCloseModal={handleCloseModal}
          message="경매 중으로 넘어간 작품은 수정/삭제가 불가능 합니다."
          className="top-5"
          thisId={thisId}
        />
      )}

      <Navigate isRightButton={false} message="판매활동" />
      <Tab.Group>
        <Tab.List className="w-full text-14 ">
          <Tab className="z-10 h-[52px] w-1/3 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            등록된 작품
          </Tab>
          <Tab className="z-10 h-[52px] w-1/3 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            경매 중
          </Tab>
          <Tab className="z-10 h-[52px] w-1/3 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            경매 완료
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {registered.length ? (
              registered.map((item) => (
                <SellingItem
                  key={item.id}
                  sellingItem={item}
                  handleOption={handleOption}
                />
              ))
            ) : (
              <None path="selling" message="등록된 작품이 없어요." />
            )}
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels>
          <Tab.Panel>
            {processing.length ? (
              processing.map((item) => (
                <SellingItem
                  key={item.id}
                  sellingItem={item}
                  handleOption={handleOption}
                />
              ))
            ) : (
              <None path="selling" message="경매중인 작품이 없어요." />
            )}
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels>
          <Tab.Panel>
            {sales_finished.length ? (
              sales_finished.map((item) => (
                <SellingItem
                  key={item.id}
                  sellingItem={item}
                  handleOption={handleOption}
                />
              ))
            ) : (
              <None path="selling" message="경매에 참여한 내역이 없어요." />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
