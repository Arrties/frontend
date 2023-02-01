import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from 'stories/Button';
import { useRouter } from 'next/router';
import useGetDetail from '@hooks/queries/useGetDetail';
import Navigate from '@components/common/Navigate';
import artworkApi from '@apis/artwork/artworkApi';
import chatApi from '@apis/chat/chatApi';

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
          className="fixed inset-x-0 top-0 z-10 m-auto h-10 max-w-[384px]"
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
        <section className="absolute inset-x-0 top-0 h-60">
          <Image
            alt="detail"
            src={artWork?.images[0] || '/svg/example/detail.svg'}
            fill
            className="object-cover"
            quality={100}
          />
        </section>
        <section className="absolute inset-x-0 top-[13rem] h-full rounded-2xl bg-white px-6 py-8">
          <article>
            <div>
              <div className="text-18 font-semibold">{artWork?.title}</div>
              <div className="mt-3 text-14">{artist?.artistEducation}</div>
            </div>
            <p className="absolute right-6 top-8 text-14">
              <span className="rounded-l-md bg-[#F8F8FA] px-2 py-1 text-brand">
                마감까지
              </span>
              <span className="rounded-r-md bg-brand px-2 py-1 text-[#FFFFFF]">
                D-3
              </span>
            </p>
          </article>
          <article className="space-y-3 py-8 text-14 leading-[14px]">
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">
                작가명
              </span>
              <span className="text-[#191919]">{artist?.artistName}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">
                제작연도
              </span>
              <span className="text-[#191919]">{artWork?.productionYear}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">장르</span>
              <span className="text-[#191919]">{artWork?.genre}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">재료</span>
              <span className="text-[#191919]">재료</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">액자</span>
              <span className="text-[#191919]">
                {artWork?.frame ? '있음' : '없음'}
              </span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">크기</span>
              <span className="text-[#191919]">
                {artWork?.artWorkSize?.width}x{artWork?.artWorkSize?.length}x
                {artWork?.artWorkSize?.height} | {artWork?.artWorkSize?.size}호
              </span>
            </p>
          </article>
          <article className="border-y py-8">
            <div className="text-18 font-bold">작가 프로필</div>
            <div className="my-2 ml-3 flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-[#999999]">
              <Image
                src={
                  artist?.artistImage || '/svg/icons/profile/icon_avatar.svg'
                }
                width="35"
                height="0"
                alt="avatar"
              />
            </div>
            <div className="ml-1 w-[5rem] text-center">
              {artist?.artistName}
            </div>
          </article>
          <article className="border-b py-8">
            <div className="text-18 font-medium">작품 설명</div>
            <div className="py-2 text-12 text-brand">
              세부 사항 등 궁금한 점은 채팅으로 작가와 소통 할 수 있어요.
            </div>
            <div className="py-5">
              <p className="text-14">{artWork?.description}</p>
              <div>
                {artWork?.keywords?.map((keyword: string, idx: number) => (
                  <></>
                ))}
              </div>
            </div>
          </article>

          <article className="relative h-[457px] w-full">
            <Image
              alt="guarantee"
              src={artWork?.guaranteeImage || '/svg/example/guarantee.svg'}
              fill
              className="object-contain"
              priority
            />
          </article>

          <div className="h-[5rem]"></div>
        </section>
      </Layout>
      <article className="absolute inset-x-0 bottom-[34px] m-auto flex w-[calc(100%-48px)] max-w-[384px] gap-5">
        <Button text="채팅하기" kind="outlined" onClick={handleChat} />
        <Button text="응찰하기" onClick={handlePurchase} />
      </article>
    </>
  );
}
