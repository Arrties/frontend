import 'swiper/css';
import 'swiper/css/pagination';

import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import AuctionItem from '@components/home/AuctionItem';
import Calendar from '@components/home/Calendar';
import ExhibitionItem from '@components/home/ExhibitionItem';
import FloatButton from '@components/home/FloatButton';
import ScheduleItem from '@components/home/ScheduleItem';
import useGetCustomizedArtWork from '@hooks/queries/useGetCustomizedArtWork';
import useGetProfile from '@hooks/queries/useGetProfile';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { Autoplay, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isUser } from '@utils/isUser';
import { Pagination } from 'swiper';
import KeywordBox from '@components/common/KeywordBox';
import Navigate from '@components/common/Navigate';
import NoticeIcon from '@components/common/NoticeIcon';
import useGetAuction from '@hooks/queries/auction/useGetAuction';
import useGetPastAuction from '@hooks/queries/auction/useGetPastAuction';
import { makeThreeEach } from '@utils/makeThreeEach';

export default function Home() {
  const router = useRouter();
  const { data: customizedArtwork } = useGetCustomizedArtWork(1, 5) || {};
  const { data: userInfo } = useGetProfile();
  const { data: auctionList } = useGetAuction();
  const { data: pastAuctionList } = useGetPastAuction();
  return (
    <>
      <Layout>
        <Navigate
          left_message={
            <Image
              alt="logo"
              src="/svg/icons/icon_logo.svg"
              width="90"
              height="90"
            />
          }
          handleLeftButton={() => {
            router.push('/home');
          }}
          right_message={<NoticeIcon />}
        />
        <section>
          <div className="text-14 text-[#767676]">
            {userInfo?.nickname}님 취향의
          </div>
          <div className="relative flex justify-between">
            <span className="text-20 font-bold">이번 주 전시작품</span>
            {customizedArtwork?.artworks.length ? (
              <div className="flex items-center justify-between">
                <span
                  className="cursor-pointer pr-1 text-12 text-[#999999]"
                  onClick={() => {
                    router.push('/home/view');
                  }}
                >
                  전체보기
                </span>
                <Image
                  src="/svg/icons/icon_arrow.svg"
                  alt="arrow"
                  width={6}
                  height={6}
                />
              </div>
            ) : (
              <div className="absolute right-0 -top-7 mt-6 mb-12 flex justify-center text-center">
                <button
                  onClick={() => {
                    router.push('/profile/keyword');
                  }}
                  className="flex h-[36px] w-[100px] items-center justify-center rounded-[19px] border-[1px] border-brand text-xs text-brand"
                >
                  <div>
                    <Image
                      src="/svg/icons/icon_plus_pink.svg"
                      alt="plus"
                      width={10}
                      height={10}
                    />
                  </div>
                  <div>취향분석</div>
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="my-4 mt-2 flex flex-wrap">
          {userInfo?.keywords?.map((keyword: string, idx: number) => (
            <KeywordBox text={keyword} key={idx} />
          ))}
        </section>
        <section className="mb-12 ">
          <Swiper
            modules={[Autoplay, Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
            spaceBetween={2}
            slidesPerView={2.1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {customizedArtwork?.artworks?.map(
              (art: KeywordArtwork, idx: number) => (
                <SwiperSlide key={idx}>
                  <ExhibitionItem
                    image={art.image}
                    education={art.education}
                    title={art.title}
                    id={art.id}
                    pick={art.pick}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </section>
        <section className="mb-3">
          <div className="flex flex-col">
            <span className="text-14 text-[#767676]">
              놓치지 말고 참여하세요
            </span>
            <span className="text-20 font-bold text-[#191919]">
              아띠즈 경매 캘린더
            </span>
          </div>
          <Calendar
            auctionList={auctionList}
            pastAuctionList={pastAuctionList}
          />
        </section>
        <section className="mb-12">
          {!!auctionList &&
            auctionList.map((auctionItem: AuctionList) => (
              <div key={auctionItem?.id}>
                <ScheduleItem auctionItem={auctionItem} />
              </div>
            ))}
          {!!pastAuctionList &&
            pastAuctionList.map((auctionItem: AuctionList) => (
              <div key={auctionItem?.id}>
                <ScheduleItem auctionItem={auctionItem} />
              </div>
            ))}
        </section>
        <section>
          <div className="mb-5 flex flex-col">
            <span className="text-14 text-[#767676]">아쉽지만 끝난</span>
            <span className="text-20 font-bold text-[#191919]">
              지난 경매 리스트
            </span>
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerGroup={1}
            slidesPerView={1}
            modules={[Pagination]}
            pagination={true}
            className="h-[360px]"
          >
            {!!pastAuctionList &&
              makeThreeEach(pastAuctionList)?.map(
                (auctionItem: AuctionList[], index: number) => (
                  <SwiperSlide key={'' + index}>
                    {auctionItem.map((auctionItem: AuctionList) => (
                      <AuctionItem
                        key={auctionItem.id}
                        auctionItem={auctionItem}
                      />
                    ))}
                  </SwiperSlide>
                ),
              )}
          </Swiper>
        </section>
        {isUser ? <div className="h-16" /> : <FloatButton />}
      </Layout>
      <Tab />
    </>
  );
}
