import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import PickArtistWork from '@components/profile/pick/PickArtistWork';
import useGetPickDetail from '@hooks/queries/useGetPickDetail';
import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';

interface defaultProps {
  [key: string]: any;
}

const PickDetailContainer = tw.div<defaultProps>`
w-full flex items-center cursor-pointer mt-5 mb-8
`;

const PickDetailProfile = tw.div<defaultProps>`
w-[60px] mr-[10px] aspect-square flex justify-center items-center rounded-full border-[1px] border-[#999999]
`;

export function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default function PickDetail({ params }) {
  const artistId = params?.id;
  const router = useRouter();
  const handleArtistWork = () => {
    router.push('/detail'); // 추후에 수정 필요
  };
  const id = 5;
  const { pickDetail } = useGetPickDetail(id);
  const members = pickDetail?.member;
  const artworks = pickDetail?.artworks;

  return (
    <Layout>
      <Navigate isRightButton={false} message="작가 프로필" />
      <PickDetailContainer>
        {members && members.image && (
          <PickDetailProfile>
            <Image src={members?.image} alt="avatar" width={34} height={34} />
          </PickDetailProfile>
        )}
        <div className="flex h-10 flex-col">
          <span className="text-18 font-semibold">{members?.nickname}</span>
          <span className="text-14">{members?.education}</span>
        </div>
      </PickDetailContainer>

      <Tab.Group>
        <Tab.List>
          <Tab className="h-[52px] w-1/2 border-[#191919] text-16 font-bold ui-selected:border-b-[3px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            작가소개
          </Tab>
          <Tab className="h-[52px] w-1/2 border-[#191919] text-16 font-bold ui-selected:border-b-[3px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999] ">
            작품
          </Tab>
        </Tab.List>
        <Tab.Panels className="pt-8">
          <Tab.Panel className="space-y-8">
            <div className="space-y-3 text-14">
              <p className="font-semibold">소개</p>
              <p className="text-12 font-bold leading-5">
                {members?.description}
              </p>
            </div>
            <div className="space-y-3 text-14">
              <p className="font-semibold">이력</p>
              <p className="text-12 font-bold leading-5">{members?.history}</p>
            </div>
            <div className="text-14">
              <p className="font-semibold">SNS</p>
              <div className="mt-3 flex">
                <div className="flex w-1/2 items-center">
                  <Image
                    src="/svg/icons/icon_instagram_black.svg"
                    width={20}
                    height={20}
                    alt="instagram"
                  />
                  <p className="ml-[6px] text-12 font-bold leading-5">
                    {members?.instagram}
                  </p>
                </div>
                <div className="flex w-1/2 items-center">
                  <Image
                    src="/svg/icons/icon_behance_black.svg"
                    width={20}
                    height={20}
                    alt="behance"
                  />
                  <p className="ml-[6px] text-12 font-bold leading-5">
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
