import Layout from '@components/common/Layout';
import React, { useState } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import PickArtistWork from '@components/profile/pick/PickArtistWork';
import useGetPickDetail from '@hooks/queries/useGetPickDetail';

interface defaultProps {
  [key: string]: any;
}

const PickDetailContainer = tw.div<defaultProps>`
w-full flex items-center cursor-pointer mt-5 mb-8
`;

const PickDetailProfile = tw.div<defaultProps>`
w-[60px] mr-[10px] aspect-square flex justify-center items-center rounded-full border-[1px] border-[#999999]
`;

export default function PickDetail() {
  const router = useRouter();
  const handleChat = () => {
    // 채팅하러 가기
  };
  const handleArtistWork = () => {
    router.push('/detail'); // 추후에 수정 필요
  };
  const id = 1;
  const { pickDetail } = useGetPickDetail(id);
  const members = pickDetail?.member;
  const artworks = pickDetail?.artworks;

  return (
    <Layout>
      <Navigate
        isRightButton={false}
        handleLeftButton={() => {
          router.back();
        }}
      />
      <PickDetailContainer>
        {members && members.image && (
          <PickDetailProfile>
            <Image src={members?.image} alt="avatar" width={34} height={34} />
          </PickDetailProfile>
        )}
        <div className="flex flex-col h-10">
          <span className="text-18 font-semibold">{members?.nickname}</span>
          <span className="text-14">{members?.education}</span>
        </div>
      </PickDetailContainer>

      <Tab.Group>
        <Tab.List>
          <Tab className="w-1/2 h-[52px] font-bold text-16 ui-selected:border-b-[3px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b ui-not-selected:text-[#999999] ">
            작가소개
          </Tab>
          <Tab className="w-1/2 h-[52px] font-bold text-16 ui-selected:border-b-[3px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b ui-not-selected:text-[#999999] ">
            작품
          </Tab>
        </Tab.List>
        <Tab.Panels className="pt-8">
          <Tab.Panel className="space-y-8">
            <div className="text-14 space-y-3">
              <p className="font-semibold">소개</p>
              <p className="leading-5 text-12 font-bold">
                {members?.description}
              </p>
            </div>
            <div className="text-14 space-y-3">
              <p className="font-semibold">이력</p>
              <p className="leading-5 text-12 font-bold">{members?.history}</p>
            </div>
            <div className="text-14">
              <p className="font-semibold">SNS</p>
              <div className="flex mt-3">
                <div className="w-1/2 flex items-center">
                  <Image
                    src="/svg/icons/icon_instagram_black.svg"
                    width={20}
                    height={20}
                    alt="instagram"
                  />
                  <p className="leading-5 ml-[6px] text-12 font-bold">
                    {members?.instagram}
                  </p>
                </div>
                <div className="w-1/2 flex items-center">
                  <Image
                    src="/svg/icons/icon_behance_black.svg"
                    width={20}
                    height={20}
                    alt="behance"
                  />
                  <p className="leading-5 ml-[6px] text-12 font-bold">
                    {members?.behance}
                  </p>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="space-y-6">
            {artworks?.map((artwork: Artwork, index) => (
              <PickArtistWork
                key={index}
                title={artwork?.title}
                status={artwork?.status}
                onClick={handleArtistWork}
              />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
