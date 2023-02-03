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
import useGetAuction from '@hooks/queries/useGetAuction';
import moment from 'moment';

interface KeywordArtwork {
  id: string;
  image: string;
  title: string;
  education: string;
}

const DUMP_AUCTION_LISTS = [
  { time: 1, start: '12:00', end: '14:00' },
  { time: 2, start: '12:00', end: '19:00' },
];

const makeThreeEach = (auctionList: AuctionList[]) => {
  const afterArr: AuctionList[][] = [];
  let arr: AuctionList[] = [];
  auctionList.forEach((it: any, idx: number) => {
    arr.push(it);
    if (arr.length === 3) {
      afterArr.push(arr);
      arr = [];
    }
    if (idx === auctionList.length - 1) {
      afterArr.push(arr);
    }
  });
  return afterArr;
};

export default function Home() {
  const router = useRouter();

  const { data: customizedArtwork } = useGetCustomizedArtWork(1, 5);
  const { data: userInfo } = useGetProfile();
  const { data: auctionList } = useGetAuction();
  const a = new Intl.DateTimeFormat('ko', { dateStyle: 'long' }).format(
    new Date(moment('2019-12-10', 'YYYY-MM-DD').format('LLLL')),
  );
  if (!!auctionList) {
    console.log(new Date(moment('2019-12-10', 'YYYY-MM-DD').format('LLLL')));
    console.log(a);
  }

  return (
    <>
      <Layout>
        <Navigate
          left_message={
            <Image
              alt="logo"
              src="/svg/icons/icon_logo.svg"
              width="90"
              height="0"
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
          <div className="flex justify-between">
            <span className="text-20 font-bold">이번 주 전시작품</span>
            <div className="flex items-center justify-between">
              <span
                className="cursor-pointer pr-1 text-12 text-[#999999]"
                onClick={() => {
                  router.push('home/view');
                }}
              >
                전체보기
              </span>
              <Image
                src="/svg/icons/icon_arrow.svg"
                alt="arrow"
                width={6}
                height={0}
              />
            </div>
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
                    src={art.image}
                    education={art.education}
                    title={art.title}
                    id={art.id}
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
          <Calendar auctionList={auctionList} />
        </section>
        <section className="mb-12">
          {!!auctionList &&
            auctionList.map((auctionItem) => (
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
            {!!auctionList &&
              makeThreeEach(auctionList)?.map(
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
