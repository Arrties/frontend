import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from 'stories/Button';
import { useRouter } from 'next/router';
import useGetDetail from '@hooks/queries/useGetDetail';
import Navigate from '@components/common/Navigate';
import artworkApi from '@apis/artwork/artworkApi';
import chatApi from '@apis/chat/chatApi';
import KeywordBox from '@components/common/KeywordBox';

export function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default function Detail({ params }) {
  const router = useRouter();
  const artWorkId = params?.id;
  const { data: detailData, refetch: refetchDetail } = useGetDetail(
    Number(artWorkId),
  );
  const { artWork, artist } = detailData || {};

  const handleChat = async () => {
    const chatData = await chatApi.postChatRoom({
      artistId: artist?.id,
      artWorkId: artWork?.id,
    });
    router.push(`/chat/${chatData?.chatRoomId}`);
  };
  const handlePurchase = () => {
    router.push(`/auction/${artWork?.id}`);
  };
  const handlePreferButton = async () => {
    if (detailData?.preferred) {
      await artworkApi.postDeletePrefer(artWorkId);
      refetchDetail();
    } else {
      await artworkApi.postPrefer(artWorkId);
      refetchDetail();
    }
  };

  return (
    <>
      <Layout>
        <Navigate
          className="fixed inset-x-0 top-[25px] z-10 m-auto h-10 max-w-[350px]"
          right_message={
            detailData?.preferred ? (
              <Image
                alt="heart"
                src="/svg/icons/icon_heart_filled.svg"
                width="18"
                height="0"
              />
            ) : (
              <Image
                alt="heart"
                src="/svg/icons/icon_heart.svg"
                width="18"
                height="0"
              />
            )
          }
          handleRightButton={handlePreferButton}
        />
        <section>
          <Image
            alt="detail"
            src={artWork?.images[0] || '/svg/example/detail.svg'}
            width="1000"
            height="0"
            className="absolute inset-x-0 top-0 w-full"
            priority
          />
        </section>
        <section className="absolute inset-x-0 top-[13rem] h-full rounded-[1.6rem] bg-white p-5">
          <article>
            <div className="relative">
              <div className="text-20 font-bold">{artWork?.title}</div>
              <div className="mt-1">{artist?.artistEducation}</div>
            </div>
            <p className="absolute right-5 top-5">
              <span className="bg-[#F8F8FA] py-0.5 px-1 text-12 font-bold text-brand">
                마감까지
              </span>
              <span className="bg-brand py-0.5 px-1 text-12 font-bold text-[#FFFFFF]">
                D-3
              </span>
            </p>
          </article>
          <article className="py-5">
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">
                작가명
              </span>
              <span className="text-[#191919]">{artist?.artistName}</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">
                제작연도
              </span>
              <span className="text-[#191919]">{artWork?.productionYear}</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">장르</span>
              <span className="text-[#191919]">{artWork?.genre}</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">재료</span>
              <span className="text-[#191919]">재료</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">액자</span>
              <span className="text-[#191919]">
                {artWork?.frame ? '있음' : '없음'}
              </span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">크기</span>
              <span className="text-[#191919]">
                {artWork?.artWorkSize?.width}x{artWork?.artWorkSize?.length}x
                {artWork?.artWorkSize?.height} | {artWork?.artWorkSize?.size}호
              </span>
            </p>
          </article>
          <article className="border-y py-8 px-2">
            <div className="text-18 font-bold">작가 프로필</div>
            <div className="my-2 ml-3 flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-[#999999]">
              <Image
                src={
                  artist?.artistImage || '/svg/icons/profile/icon_avatar.svg'
                }
                width="35"
                height="0"
                alt="avatar"
                onClick={() => {
                  router.push(`/profile/pick/${artist?.id}`);
                }}
              />
            </div>
            <div className="ml-1 w-[5rem] text-center">
              {artist?.artistName}
            </div>
          </article>
          <article className="border-b py-5">
            <div className="text-18 font-bold">작품 설명</div>
            <div className="py-2 text-12 text-brand">
              세부 사항 등 궁금한 점은 채팅으로 작가와 소통 할 수 있어요.
            </div>
            <div>
              <p className="text-14">{artWork?.description}</p>
              <div className="mt-4">
                {artWork?.keywords?.map((keyword: string, idx: number) => (
                  <KeywordBox text={keyword} key={idx} />
                ))}
              </div>
            </div>
          </article>

          <Image
            alt="guarantee"
            src={artWork?.guaranteeImage || '/svg/example/guarantee.svg'}
            width="1000"
            height="0"
            className="w-full py-5"
            priority
          />

          <div className="h-[5rem]"></div>
        </section>
      </Layout>
      <article className="absolute inset-x-0 bottom-[34px] m-auto flex max-w-[360px] gap-5">
        <Button text="채팅하기" kind="outlined" onClick={handleChat} />
        <Button text="응찰하기" onClick={handlePurchase} />
      </article>
    </>
  );
}
