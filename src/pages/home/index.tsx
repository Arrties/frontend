import 'swiper/css';
import 'swiper/css/pagination';

import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import AuctionItem from '@components/home/AuctionItem';
import Calendar from '@components/home/Calendar';
import ExhibitionItem from '@components/home/ExhibitionItem';
import ScheduleItem from '@components/home/ScheduleItem';
import useGetKeywordArtWork from '@hooks/queries/useGetKeywordArtWork';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { Autoplay, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isUser } from '@utils/isUser';
import { Pagination } from 'swiper';
import useGetProfile from '@hooks/queries/useGetProfile';

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

interface AuctionListForm {
  src: string;
  date: string;
  artRegister: number;
  auctionRegister: number;
  id: number;
}

const DUMP_PREV_AUCTION_LISTS: AuctionListForm[] = [
  {
    src: '/svg/example/exhibition.svg',
    date: '2022.12.21',
    artRegister: 20,
    auctionRegister: 18,
    id: 1,
  },
  {
    src: '/svg/example/exhibition.svg',
    date: '2022.12.21',
    artRegister: 20,
    auctionRegister: 18,
    id: 2,
  },
  {
    src: '/svg/example/exhibition.svg',
    date: '2022.12.21',
    artRegister: 20,
    auctionRegister: 18,
    id: 3,
  },
  {
    src: '/svg/example/exhibition.svg',
    date: '2022.12.21',
    artRegister: 20,
    auctionRegister: 18,
    id: 4,
  },
  {
    src: '/svg/example/exhibition.svg',
    date: '2022.12.21',
    artRegister: 20,
    auctionRegister: 18,
    id: 5,
  },
];
const makeThreeEach = (auctionList) => {
  const afterArr: AuctionListForm[][] = [];
  let arr: AuctionListForm[] = [];
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
const DUMP_AFTER_AUCTION_LIST = makeThreeEach(DUMP_PREV_AUCTION_LISTS);

export default function Home() {
  const router = useRouter();

  const { data: keywordArtwork } = useGetKeywordArtWork();
  const { data: userInfo } = useGetProfile();
  return (
    <>
      <Layout>
        <AuctionNavigate />
        <section className="">
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
        <section className="my-4">
          {userInfo?.keywords?.map((keyword) => (
            <span
              className="mr-2 mb-1 rounded-[19px] border-[1px] border-[#DBDBDB] px-2 py-1 text-12 text-[#767676] last:mr-0 "
              key={keyword}
            >
              {keyword}
            </span>
          ))}
        </section>
        <section className="mb-12">
          <Swiper
            modules={[Autoplay, Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
            spaceBetween={2}
            slidesPerView={2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {keywordArtwork?.map((art: KeywordArtwork, idx: number) => (
              <SwiperSlide key={idx}>
                <ExhibitionItem
                  src={art.image}
                  school={art.education}
                  name={art.title}
                />
              </SwiperSlide>
            ))}
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
          <Calendar />
        </section>
        <section className="mb-12">
          {DUMP_AUCTION_LISTS.map((auction, idx) => (
            <div key={idx}>
              <ScheduleItem
                time={auction.time}
                start={auction.start}
                end={auction.end}
              />
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
            {DUMP_AFTER_AUCTION_LIST.map(
              (auctionList: AuctionListForm[], index: number) => (
                <SwiperSlide key={'' + index}>
                  {auctionList.map(
                    (auctionItem: AuctionListForm, idx: number) => (
                      <AuctionItem
                        key={'' + idx}
                        src={auctionItem.src}
                        date={auctionItem.date}
                        artRegister={auctionItem.artRegister}
                        auctionRegister={auctionItem.auctionRegister}
                        id={auctionItem.id}
                        onClick={() => {
                          router.push('/home/history');
                        }}
                      />
                    ),
                  )}
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </section>
        {!isUser && (
          <Image
            src="/svg/icons/icon_registration.svg"
            alt="register"
            width={80}
            height={0}
            onClick={() => {
              router.push('/home/post');
            }}
            className="sticky bottom-[10px] z-50  m-auto mr-0 h-[72px] w-[72px] cursor-pointer"
          />
        )}
      </Layout>
      <Tab />
    </>
  );
}
