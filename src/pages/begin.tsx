import 'swiper/css';

import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface defaultProps {
  [key: string]: any;
}

const ImageWrapper = tw.div<defaultProps>`h-[340px] pt-[100px] `;
const Title = tw.p`
text-20 font-bold mt-16
`;
const Content = tw.p<defaultProps>`text-10 text-[#767676] mt-2 leading-4`;
const Line = tw.span``;

export default function Begin() {
  const swiperRef = useRef<any>(null);
  const router = useRouter();
  return (
    <Layout>
      <div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          ref={swiperRef}
        >
          <SwiperSlide>
            <Navigate
              isLeftButton={false}
              right_message="건너뛰기"
              handleRightButton={() =>
                swiperRef.current.swiper.slideTo(2, 1000)
              }
            />
            <ImageWrapper>
              <Image
                alt="begin"
                src="/svg/begin/begin_01.svg"
                width="375"
                height="0"
              />
            </ImageWrapper>
            <div className="pl-6">
              <Title className="text-20 font-bold mt-16">
                버려지는 작품을 판매해보세요.
              </Title>
              <Content>
                <Line>졸업작품 혹은 과제물로 열심히 작업 후</Line>
                <Line>버려지고 방치되는게 아깝지 않으신가요?</Line>
              </Content>
            </div>
            <div className="space-x-3 flex justify-center mt-6">
              <div className="w-2 rounded-full aspect-square bg-brand"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Navigate
              isLeftButton={false}
              right_message="건너뛰기"
              handleRightButton={() => swiperRef.current.swiper.slideTo(2)}
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
            <div className="space-x-3 flex justify-center mt-6">
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-brand"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <ImageWrapper className="mt-14">
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
                <Line>현대미술의 장점! 채팅으로 컬렉터분들과 소통해요.</Line>
              </Content>
            </div>
            <div className="space-x-3 flex justify-center mt-6">
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-brand"></div>
            </div>
            <Button
              onClick={() => router.push('/auth/login')}
              className="mt-7"
              text="시작하기"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </Layout>
  );
}
