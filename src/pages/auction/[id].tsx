import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'stories/Button';
import { useRouter } from 'next/router';
import useGetDetail from '@hooks/queries/useGetDetail';
import chatApi from '@apis/chat/chatApi';
import usePostPrefer from '@hooks/mutations/usePostPrefer';
import useDeletePrefer from '@hooks/mutations/useDeletePrefer';
import { useCountDown } from '@hooks/useCountDown';
import Loader from '@components/common/Loader';

export default function Detail() {
  const router = useRouter();

  const artWorkId = router.query.id;
  const { data: detailData, isLoading } = useGetDetail(+artWorkId!);
  const { artWork, artist } = detailData || {};
  const { mutate: postPrefer } = usePostPrefer(artWork?.id!);
  const { mutate: deletePrefer } = useDeletePrefer(artWork?.id!);
  const [days, hours, minutes, seconds] = useCountDown?.(
    detailData?.endDate || '',
  );
  const remaind = +days + +hours + +minutes + +seconds;

  const handleChat = async () => {
    const chatData = await chatApi.postChatRoom({
      artistId: artist?.id!,
      artWorkId: artWork?.id!,
    });
    await router.push(`/chat/${chatData?.chatRoomId}`);
  };

  const handlePreferButton = () => {
    if (detailData?.preferred) {
      deletePrefer();
    } else {
      postPrefer();
    }
  };

  const target = useRef<HTMLDivElement | null>(null);
  const [isCardOver, setIsCardOver] = useState(false);
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.boundingClientRect.y < 64) {
        setIsCardOver(true);
      } else {
        setIsCardOver(false);
      }
    });
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        rootMargin: `0px 0px -${window.innerHeight - 64}px 0px`,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Layout>
        <div
          className={`fixed inset-x-0 top-0 z-50 mx-auto flex h-16 w-full max-w-[420px] items-center justify-between px-6 ${
            isCardOver && 'bg-white'
          }`}
        >
          {isCardOver ? (
            <>
              <Image
                onClick={() => router.back()}
                alt="back"
                src="/svg/icons/auction/icon_arrow_black.svg"
                width="24"
                height="24"
                className="cursor-pointer"
              />
              {detailData?.preferred ? (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/icon_heart_filled.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              ) : (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/auction/icon_heart_black.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              )}
            </>
          ) : (
            <>
              <Image
                alt="back"
                src="/svg/icons/auction/icon_arrow_white.svg"
                width="24"
                height="24"
                className="cursor-pointer"
                onClick={() => router.back()}
              />
              {detailData?.preferred ? (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/icon_heart_filled.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              ) : (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/auction/icon_heart_white.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              )}
            </>
          )}
        </div>

        <section className="absolute inset-x-0 top-0 h-60">
          <Image
            alt="detail"
            src={artWork?.images[0] || '/svg/example/detail.svg'}
            fill
            className="object-cover"
            quality={100}
          />
        </section>
        <section
          ref={target}
          className="absolute inset-x-0 top-[13rem] h-full rounded-2xl bg-white px-6 py-8"
        >
          <article>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-18 font-semibold">{artWork?.title}</span>
                <span className="text-14">
                  <span className="rounded-l-md bg-[#F8F8FA] px-2 py-1 text-brand">
                    마감까지
                  </span>
                  <span className="rounded-r-md bg-brand px-2 py-1 text-[#FFFFFF]">
                    {remaind < 0 ? (
                      <span className="w-[66px] text-[14px] font-medium tracking-widest">
                        00:00:00
                      </span>
                    ) : (
                      <span
                        className={`${
                          +days >= 1 ? 'w-fit' : 'w-[66px]'
                        } text-[14px] font-medium tracking-widest`}
                      >
                        {+days >= 1
                          ? 'D-' + days
                          : hours + ':' + minutes + ':' + seconds}
                      </span>
                    )}
                  </span>
                </span>
              </div>
              <div className="mt-3 text-14">{artist?.artistEducation}</div>
            </div>
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
          <div className="mt-8 border-y border-y-[#EDEDED] py-8">
            <div className="flex w-[74px] flex-col items-center justify-center">
              <p className="w-full text-center font-medium">작가프로필</p>
              <div className="my-2 flex aspect-square w-[4rem] items-center justify-center rounded-full border border-[#999999]">
                <Image
                  src={
                    artist?.artistImage || '/svg/icons/profile/icon_avatar.svg'
                  }
                  width="35"
                  height="0"
                  alt="profile"
                  onClick={() => {
                    router.push(`/profile/${artist?.id}`);
                  }}
                />
              </div>
              <div className="w-fulltext-center ">{artist?.artistName}</div>
            </div>
          </div>

          <article className="border-b py-8 font-medium">
            <div className="text-16">작품 설명</div>
            <div className="mt-2 text-10 text-brand">
              세부 사항 등 궁금한 점은 채팅으로 작가와 소통 할 수 있어요.
            </div>
            <div className="mt-4">
              <p className="text-14">{artWork?.description}</p>
              <div className="mt-4">
                {artWork?.keywords?.map((keyword: string, idx: number) => (
                  <span
                    key={idx}
                    className="mr-2 mt-2 rounded-[19px] border border-[#CECECE] px-3 py-1 text-[14px] text-[#767676] "
                  >
                    {keyword}
                  </span>
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
          <div className="h-[7rem]" />
        </section>
      </Layout>
      <article className="absolute inset-x-0 bottom-0 mx-auto max-w-[420px]">
        <div className="h-[18px] bg-gradient-to-t from-white to-gray-100"></div>
        <div className="m-auto flex w-full  gap-5 bg-white  px-6 pb-9 shadow-lg">
          <Button text="채팅하기" kind="outlined" onClick={handleChat} />
          <Button
            text="응찰하기"
            onClick={() => router.push(`/auction/bidding/${artWorkId}`)}
          />
        </div>
      </article>
    </>
  );
}
