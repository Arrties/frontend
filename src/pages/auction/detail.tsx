import Button from '@components/common/Button';
import DivisionBar from '@components/common/DivisionBar';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface inputForm {
  singlePrice: number;
  autoPrice: number;
}

export default function Detail() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputForm>();

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
      <Navigate isLeftButton={false} handleRightButton={handleRightButton} />
      <section>
        <article className="gap-1">
          <p className="text-16 font-bold">콰야 녹아내리는 고드름</p>
          <p className="text-12 indent-1">
            <span className="mr-2">아라</span>
            <span className="mr-2">회화</span>
            <span>painting</span>
          </p>
        </article>
        <article className="rounded-xl border border-[#D9D9D9] h-[70px] flex items-center mt-5">
          <div className="border-r border-[#D9D9D9] flex flex-col items-center flex-grow">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="text-14 ml-1">남은시간</span>
            </p>
            <p className="text-16 font-semibold">1일 2:43:56</p>
          </div>
          <div className="flex flex-col items-center flex-grow">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="text-14 ml-1">시작시간</span>
            </p>
            <p className="text-16 font-semibold">2023-02-08 09:00</p>
          </div>
        </article>
      </section>
      <section>
        <article className="flex justify-between my-6 px-2">
          <span className="text-14 font-bold">경매순위</span>
          <span
            className="text-12 text-[#767676] border border-[#DBDBDB] px-1 py-0.5 rounded font-bold cursor-pointer"
            onClick={handleOlderTable}
          >
            호가표
          </span>
        </article>
        <table>
          <tbody className="w-full text-center text-14">
            <tr className="h-7">
              <td>이름</td>
              <td className="font-bold">금액</td>
              <td>날짜</td>
              <td>시간</td>
            </tr>
            <tr className="h-7">
              <td>라미</td>
              <td className="font-bold">2,800,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
            <tr className="h-7">
              <td>노니</td>
              <td className="font-bold">2,700,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
            <tr className="h-7">
              <td>고니</td>
              <td className="font-bold">2,700,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
            <tr className="h-7">
              <td>피터</td>
              <td className="font-bold">2,700,000</td>
              <td>2022-12-16</td>
              <td>11:38:02</td>
            </tr>
          </tbody>
        </table>
      </section>
      <DivisionBar className="mt-10" />
      <form className="my-[30px]" onSubmit={handleSubmit(onSubmit)}>
        <article>
          <p className="text-14 font-bold">응찰하기</p>
          <p className="text-[#FF3120] text-10">
            응찰버튼을 누르면 바로 응찰되어 취소가 불가능 합니다.
          </p>
        </article>
        <article className="flex items-center gap-3">
          <div className="w-8/12  ">
            <Input
              type="text"
              placeholder="금액을 입력해주세요."
              register={{
                ...register('singlePrice', {
                  required: false,
                }),
              }}
              className="h-[42px]"
            />
            {errors.singlePrice && (
              <ErrorMessage message={errors.singlePrice.message} />
            )}
          </div>
          <div className="w-4/12 border border-[#D8D8D8] h-[42px] text-14 rounded-[4px] flex items-center box-border justify-center font-bold ">
            1회 응찰
          </div>
        </article>
        <article className="flex items-center gap-3">
          <div className="w-8/12  ">
            <Input
              type="text"
              placeholder="금액을 입력해주세요."
              register={{
                ...register('autoPrice', {
                  required: false,
                }),
              }}
              className="h-[42px]"
            />
            {errors.autoPrice && (
              <ErrorMessage message={errors.autoPrice.message} />
            )}
          </div>
          <div className="w-4/12 border border-[#D8D8D8] h-[42px] text-14 rounded-[4px] flex items-center box-border justify-center font-bold ">
            자동 응찰
          </div>
        </article>
        <Button text="확인" className="mt-7" />
      </form>
    </Layout>
  );
}
