import Button from '@components/common/Button';
import DivisionBar from '@components/common/DivisionBar';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import AskPriceModal from '@components/auction/AskPriceModal';

interface inputForm {
  singlePrice: number;
  autoPrice: number;
}

export default function Bidding() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputForm>();

  const [isModal, setIsModal] = useState<boolean>(false);

  const onSubmit = (form: inputForm) => {
    console.log(form);
  };

  const handleRightButton = () => {
    router.push('/auction');
  };
  const handleOlderTable = () => {
    console.log('호가표');
  };
  return (
    <Layout>
      <Navigate
        isLeftButton={false}
        className="text-18 font-medium"
        message="응찰내역"
        handleRightButton={handleRightButton}
      />
      <div className="top-100px absolute inset-x-0 mx-auto  max-w-[420px] border-b border-brand" />
      <section>
        <article className="mt-3">
          <div className="textd-16 font-medium">작품정보</div>
          <div className="mt-3 flex items-center">
            <div className="relative h-[97px] w-[85px] overflow-hidden rounded-[4px]">
              <Image
                alt="image"
                src="/svg/example/example_artwork_1.svg"
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-3 h-fit flex-col">
              <p className="text-15 font-semibold leading-5">
                콰야 녹아내리는 고드름
              </p>
              <p className="mt-1 text-[12.44px] text-font-500">
                아라 <span className="ml-[6px]">회화 | Painting</span>
              </p>
              <div className="mt-3 text-[13px] font-medium text-font-500">
                <p className="leading-5">
                  현재가
                  <span className="ml-2 text-brand">
                    KRW 2,800,000 (응찰 4)
                  </span>
                </p>
                <p className="leading-5">
                  시작가
                  <span className="ml-2 font-semibold text-[#191919]">
                    KRW 1,000,000
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className="mt-5 flex h-[70px] items-center rounded-xl border border-[#D9D9D9]">
          <div className="flex flex-grow flex-col items-center border-r border-[#D9D9D9]">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="ml-1 text-14">남은시간</span>
            </p>
            <p className="text-16 font-semibold">1일 2:43:56</p>
          </div>
          <div className="flex flex-grow flex-col items-center">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="ml-1 text-14">시작시간</span>
            </p>
            <p className="text-16 font-semibold">2023-02-08 09:00</p>
          </div>
        </article>
      </section>
      <DivisionBar className="absolute inset-x-0 mx-auto mt-6" />
      <section>
        <article className="mt-14 flex justify-between ">
          <span className="text-16 font-medium">경매순위</span>
          <span
            className="font-meduim cursor-pointer rounded border border-[#DBDBDB] px-1 py-0.5 text-14 text-[#767676]"
            onClick={() => setIsModal(true)}
          >
            호가표
          </span>
        </article>
        <table className="mt-4 w-full">
          <tbody className="relative w-full text-center text-14">
            <tr className="h-10">
              <td className="text-left">이름</td>
              <td>금액</td>
              <td>날짜</td>
              <td>시간</td>
            </tr>
            <div className="absolute -left-6 top-10 z-10 h-10 w-[calc(100%+48px)] bg-brand opacity-25" />
            <tr className="h-10">
              <td className="text-left">라미</td>
              <td className="font-bold text-brand">2,800,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
            <tr className="h-10">
              <td className="text-left">노니</td>
              <td className="font-bold">2,700,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
            <tr className="h-10">
              <td className="text-left">고니</td>
              <td className="font-bold">2,700,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
            <tr className="h-10">
              <td className="text-left">피터</td>
              <td className="font-bold">2,700,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
          </tbody>
        </table>
      </section>
      <DivisionBar className="absolute inset-x-0 mx-auto mt-6" />
      <form className="my-[55px]" onSubmit={handleSubmit(onSubmit)}>
        <article>
          <p className="font-meduim text-16">응찰하기</p>
          <p className="mt-1 text-12 text-[#FF3120]">
            응찰버튼을 누르면 바로 응찰되어 취소가 불가능 합니다.
          </p>
        </article>
        <article className="mt-6 flex items-center gap-3">
          <div className="w-9/12  ">
            <Input
              type="text"
              placeholder="금액을 입력해주세요."
              register={{
                ...register('singlePrice', {
                  required: false,
                }),
              }}
              className="placeholder:text-normal h-[42px] placeholder:text-14"
            />
            {errors.singlePrice && (
              <ErrorMessage message={errors.singlePrice.message} />
            )}
          </div>
          <div className="box-border flex h-[42px] w-3/12 items-center justify-center rounded-[4px] border border-[#D8D8D8] text-14 font-medium ">
            1회 응찰
          </div>
        </article>
        <article className="flex items-center gap-3">
          <div className="w-9/12  ">
            <Input
              type="text"
              placeholder="금액을 입력해주세요."
              register={{
                ...register('autoPrice', {
                  required: false,
                }),
              }}
              className="placeholder:text-normal h-[42px] placeholder:text-14"
            />
            {errors.autoPrice && (
              <ErrorMessage message={errors.autoPrice.message} />
            )}
          </div>
          <div className="box-border flex h-[42px] w-3/12 items-center justify-center rounded-[4px] border border-[#D8D8D8] text-14 font-medium">
            자동 응찰
          </div>
        </article>
        <Button text="확인" className="mt-7 w-full" />
      </form>
      <AskPriceModal
        isModal={isModal}
        message="gg"
        onCloseModal={() => setIsModal(false)}
      />
    </Layout>
  );
}
