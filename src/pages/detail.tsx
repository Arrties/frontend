import Layout from '@components/common/Layout';
import Image from 'next/image';
import React from 'react';
import Button from 'stories/Button';

export default function Detail() {
  const handleChat = () => {
    // 채팅방 만들기 API
  };
  const handlePurchase = () => {
    // 응찰 페이지로 이동
  };
  return (
    <>
      <Layout>
        <section>
          <Image
            alt="detail"
            src="/svg/example/detail.svg"
            width="0"
            height="0"
            className="absolute top-0 inset-x-0 w-full"
          />
        </section>
        <section className="absolute top-[13rem] bg-white inset-x-0 rounded-[1.6rem] h-full p-5">
          <article>
            <div className="relative">
              <div className="text-20 font-bold">콰야 녹아내리는 고드름</div>
              <div className="mt-1">홍익대학교 예술학과</div>
            </div>
            <p className="absolute right-5 top-5">
              <span className="text-brand bg-[#F8F8FA] text-12 py-0.5 px-1 font-bold">
                마감까지
              </span>
              <span className="text-12 text-[#FFFFFF] bg-brand py-0.5 px-1 font-bold">
                D-3
              </span>
            </p>
          </article>
          <article className="py-5">
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">
                작가명
              </span>
              <span className="text-[#191919]">아라 | Ara</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">
                제작연도
              </span>
              <span className="text-[#191919]">2022</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">장르</span>
              <span className="text-[#191919]">회화 | Painting</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">재료</span>
              <span className="text-[#191919]">재료 | Oill On Canvas</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">액자</span>
              <span className="text-[#191919]">없음</span>
            </p>
            <p className="h-7">
              <span className="inline-block w-[6rem] text-[#767676]">크기</span>
              <span className="text-[#191919]">41x31.8cm | 6호</span>
            </p>
          </article>
          <article className="py-8 px-2 border-y    ">
            <div className="font-bold text-18">작가 프로필</div>
            <div className="ml-3 my-2 w-[4rem] h-[4rem] border border-[#999999] rounded-full flex justify-center items-center">
              <Image
                src="/svg/icons/profile/icon_avatar.svg"
                width="35"
                height="0"
                alt="avatar"
              />
            </div>
            <div className="w-[5rem] text-center ml-1">아라</div>
          </article>
          <article className="py-5 border-b">
            <div className="text-18 font-bold">작품 설명</div>
            <div className="text-brand text-12 py-2">
              세부 사항 등 궁금한 점은 채팅으로 작가와 소통 할 수 있어요.
            </div>
            <div className="py-5">
              <p className="text-14">
                대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적
                언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를
                캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의
                질서를 만들어간다.
              </p>
              <div></div>
            </div>
          </article>

          <Image
            alt="guarantee"
            src="/svg/example/guarantee.svg"
            width="0"
            height="0"
            className="w-full py-5"
          />
          <div className="h-[5rem]"></div>
        </section>
      </Layout>
      <article className="flex gap-5 absolute top-[46rem] inset-x-0 w-[20rem] m-auto">
        <Button text="채팅하기" kind="outlined" onClick={handleChat} />
        <Button text="응찰하기" onClick={handlePurchase} />
      </article>
    </>
  );
}
