import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import Navigate from './../components/common/Navigate';
import Button from '@components/common/Button';
import { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import tw from 'tailwind-styled-components';
import 'swiper/css';
import Image from 'next/image';

const ImageWrapper = tw.div`h-[340px] pt-[100px] `;
const Title = tw.p`
text-20 font-bold mt-16
`;
const Content = tw.p`text-10 text-[#767676] mt-2 leading-4`;
const Line = tw.span``;

export default function Start() {
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();
  const handleRightButton = () => {
    swiper.slideTo(2);
  };

  return (
    <Layout>
      <Navigate
        isLeftButton={false}
        right_message="건너뛰기"
        handleRightButton={handleRightButton}
      />
      <div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          onSwiper={setSwiper}
        >
          <SwiperSlide>
            <ImageWrapper>
              <Image
                alt="start"
                src="/svg/start/start_01.svg"
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
              <div className="w-2 rounded-full aspect-square bg-[#F5535D]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <ImageWrapper>
              <Image
                alt="start"
                src="/svg/start/start_02.svg"
                width="375"
                height="0"
              />
            </ImageWrapper>
            <div className="pl-6">
              <Title>작품 외에 걱정은 NO</Title>
              <Content>
                <Line>마케팅, 배송, 판매까지 저희가 모두 다 해드려요.</Line>
                <Line>작가님이 작품에만 집중할 수 있도록 도와줘요. </Line>
              </Content>
            </div>
            <div className="space-x-3 flex justify-center mt-6">
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#F5535D]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <ImageWrapper>
              <Image
                alt="start"
                src="/svg/start/start_03.svg"
                width="280"
                height="0"
                className="mb-[100px] "
              />
            </ImageWrapper>
            <div className="pl-6">
              <Title>채팅으로 컬렉터와 소통해요</Title>
              <Content>
                <Line>아티스트와 컬렉터가 대화할 수 있는 </Line>
                <Line>현대미술의 장점! 채팅으로 컬렉터분들과 소통해요.</Line>
              </Content>
            </div>
            <div className="space-x-3 flex justify-center mt-6">
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              <div className="w-2 rounded-full aspect-square bg-[#F5535D]"></div>
            </div>
            <Button
              onClick={() => router.push('/auth/login')}
              className="mt-7"
              text="작가 등록"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </Layout>
  );
}
