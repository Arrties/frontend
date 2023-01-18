import 'swiper/css';

import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import ExhibitionItem from '@components/home/ExhibitionItem';
import ScheduleItem from '@components/home/ScheduleItem';
import Calendar from '@components/home/Calendar';
import React, { useState } from 'react';
import Image from 'next/image';
import { Autoplay, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import AuctionItem from '@components/home/AuctionItem';

const DUMP_KEYWORD_LISTS = ['사진', '소묘', '파스텔', '추상화'];
const DUMP_ART_LISTS = [
  {
    src: '/svg/example/exhibition.svg',
    school: '홍익대학교',
    name: '작품이름',
  },
  { src: '/svg/example/detail.svg', school: '서울대학교', name: '작품이름' },
  {
    src: '/svg/example/exhibition.svg',
    school: '연세대학교',
    name: '작품이름',
  },
  { src: '/svg/example/detail.svg', school: '고려대학교', name: '작품이름' },
  {
    src: '/svg/example/exhibition.svg',
    school: '건국대학교',
    name: '작품이름',
  },
];
const DUMP_AUCTION_LISTS = [
  { time: 1, start: '12:00', end: '14:00' },
  { time: 2, start: '12:00', end: '19:00' },
];
const DUMP_PREV_AUCTION_LISTS = [
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
];

export default function Home() {
  return (
    <>
      <Layout>
        <section className="flex justify-between items-center">
          <div>
            <Image
              src="/svg/icons/icon_logo.svg"
              alt="logo"
              width={95}
              height={0}
            />
          </div>
          <div className="flex">
            <span className="pr-3">
              <Image
                src="/svg/icons/icon_search.svg"
                alt="search"
                width={27}
                height={0}
              />
            </span>
            <span>
              <Image
                src="/svg/icons/icon_notification.svg"
                alt="notification"
                width={27}
                height={0}
              />
            </span>
          </div>
        </section>
        <section className="mt-8">
          <div className="text-[#767676] text-14">영서님 취향의</div>
          <div className="flex justify-between">
            <span className="text-20 font-bold">이번 주 전시작품</span>
            <div className="flex justify-between items-center">
              <span className="text-12 text-[#999999] pr-1">전체보기</span>
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
          {DUMP_KEYWORD_LISTS.map((keyword) => (
            <span
              className="border-[1px] border-[#DBDBDB] rounded-[19px] px-2 py-1 mr-2 mb-1 last:mr-0 text-12 text-[#767676] "
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
            {DUMP_ART_LISTS.map((art, idx) => (
              <SwiperSlide key={idx}>
                <ExhibitionItem
                  src={art.src}
                  school={art.school}
                  name={art.name}
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
            <span className="text-20 text-[#191919] font-bold">
              아띠즈 경매 캘린더
            </span>
          </div>
          <div>
            <Calendar />
          </div>
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
          <div className="flex flex-col mb-5">
            <span className="text-14 text-[#767676]">아쉽지만 끝난</span>
            <span className="text-20 text-[#191919] font-bold">
              지난 경매 리스트
            </span>
          </div>
          <Swiper spaceBetween={20} slidesPerGroup={1} slidesPerView={1}>
            <SwiperSlide>
              {DUMP_PREV_AUCTION_LISTS.map((auction, idx) => (
                <AuctionItem
                  key={idx}
                  src={auction.src}
                  date={auction.date}
                  artRegister={auction.artRegister}
                  auctionRegister={auction.auctionRegister}
                  id={auction.id}
                />
              ))}
            </SwiperSlide>
          </Swiper>
        </section>
        <div className="w-[72px] h-[72px] m-auto mr-0 sticky bottom-[10px] z-50 cursor-pointer">
          <Image
            src="/svg/icons/icon_registration.svg"
            alt="register"
            width={80}
            height={0}
          />
        </div>
      </Layout>
      <Tab />
    </>
  );
}
