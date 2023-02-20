import 'swiper/css';
import 'swiper/css/pagination';
import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { getToken, setToken } from '@utils/localStorage/token';
import { getLocalStorage, setLocalStorage } from '@utils/localStorage/helper';

interface defaultProps {
  [key: string]: any;
}

const ImageWrapper = tw.div<defaultProps>`h-[360px] pt-[100px] `;
const Title = tw.p`
text-18 font-bold mt-16 text-center
`;
const Content = tw.div<defaultProps>`text-[14px] font-bold text-[#767676] mt-2 leading-4 `;
const Line = tw.p`leading-5 pl-5`;

const SwiperWrapper = styled.section`
  .swiper-wrapper {
    height: 700px;
  }
  .swiper-pagination-bullet-active {
    background-color: #fc6554;
  }
`;

export default function Begin() {
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  return (
    <Layout>
      <SwiperWrapper>
        <Swiper
          navigation={true}
          modules={[Pagination]}
          className="mySwiper"
          ref={swiperRef}
          pagination={true}
        >
          <SwiperSlide>
            <Navigate
              isLeftButton={false}
              right_message="건너뛰기"
              handleRightButton={() => {
                swiperRef.current.swiper.slideTo(3);
              }}
            />
            <ImageWrapper>
              <Image
                alt="begin"
                src="/svg/begin/begin_01.svg"
                width="375"
                height="0"
                priority
              />
            </ImageWrapper>
            <div className="pl-6">
              <Title className="mt-16 text-20 font-bold">
                버려지는 작품을 판매해보세요.
              </Title>
              <Content>
                <Line>졸업작품 혹은 과제물로 열심히 작업 후</Line>
                <Line>버려지고 방치되는게 아깝지 않으신가요?</Line>
              </Content>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Navigate
              isLeftButton={false}
              right_message="건너뛰기"
              handleRightButton={() => {
                swiperRef.current.swiper.slideTo(3);
              }}
            />
            <ImageWrapper>
              <Image
                alt="begin"
                src="/svg/begin/begin_02.svg"
                width="375"
                height="0"
              />
            </ImageWrapper>
            <div className="pl-6">
              <Title>취향에 맞는 작품을 받아보세요.</Title>
              <Content>
                <Line>취향 분석과 여러 장르를 통해</Line>
                <Line>다양한 작품을 확인할 수 있습니다. </Line>
              </Content>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Navigate
              isLeftButton={false}
              right_message="건너뛰기"
              handleRightButton={() => {
                swiperRef.current.swiper.slideTo(3);
              }}
            />
            <ImageWrapper>
              <Image
                alt="begin"
                src="/svg/begin/begin_03.svg"
                width="375"
                height="0"
              />
            </ImageWrapper>
            <div className="pl-6">
              <Title>채팅으로 작가와 컬렉터가 소통해요</Title>
              <Content>
                <Line>아티스트와 컬렉터가 대화할 수 있는 </Line>
                <Line>현대미술의 장점! 채팅으로 함께 소통해요.</Line>
              </Content>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <ImageWrapper className="mt-6">
              <Image
                alt="begin"
                src="/svg/begin/begin_04.svg"
                width="375"
                height="0"
              />
            </ImageWrapper>
            <div className="mt-24 pl-6">
              <Title>수수료 없이 무료로 거래해요</Title>
              <Content>
                <Line>작가와 컬렉터가 대화할 수 있는</Line>
                <Line>현대 미술의 장점! 채팅으로 함께 소통해요.</Line>
              </Content>
            </div>

            <Button
              onClick={() => {
                setLocalStorage('isVisited', true);
                router.push('/auth/login');
              }}
              className="fixed inset-x-0 bottom-[50px] m-auto w-full"
              text="시작하기"
            />
          </SwiperSlide>
        </Swiper>
      </SwiperWrapper>
    </Layout>
  );
}
