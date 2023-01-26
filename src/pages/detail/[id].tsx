import Layout from '@components/common/Layout';
import Image from 'next/image';
import React from 'react';
import Button from 'stories/Button';
import { useRouter } from 'next/router';
import useGetDetail from '@hooks/queries/useGetDetail';

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const handleChat = () => {
    // 채팅방 만들기 API
  };
  const handlePurchase = () => {
    // 응찰 페이지로 이동
  };
  const { data } = useGetDetail(Number(id));
  console.log(data);
  return (
    <>
      <Layout>
        <section>
          <Image
            alt="detail"
            src="/svg/example/detail.svg"
            width="0"
            height="0"
            className="absolute inset-x-0 top-0 w-full"
          />
        </section>
        <section className="absolute inset-x-0 top-[13rem] h-full rounded-[1.6rem] bg-white p-5">
          <article>
            <div className="relative">
              <div className="text-20 font-bold">콰야 녹아내리는 고드름</div>
              <div className="mt-1">홍익대학교 예술학과</div>
            </div>
            <p className="absolute right-5 top-5">
              <span className="bg-[#F8F8FA] py-0.5 px-1 text-12 font-bold text-brand">
                마감까지
              </span>
              <span className="bg-brand py-0.5 px-1 text-12 font-bold text-[#FFFFFF]">
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
          <article className="border-y py-8 px-2    ">
            <div className="text-18 font-bold">작가 프로필</div>
            <div className="my-2 ml-3 flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-[#999999]">
              <Image
                src="/svg/icons/profile/icon_avatar.svg"
                width="35"
                height="0"
                alt="avatar"
              />
            </div>
            <div className="ml-1 w-[5rem] text-center">아라</div>
          </article>
          <article className="border-b py-5">
            <div className="text-18 font-bold">작품 설명</div>
            <div className="py-2 text-12 text-brand">
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
      <article className="absolute inset-x-0 top-[46rem] m-auto flex w-[20rem] gap-5">
        <Button text="채팅하기" kind="outlined" onClick={handleChat} />
        <Button text="응찰하기" onClick={handlePurchase} />
      </article>
    </>
  );
}
