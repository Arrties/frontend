import Button from '@components/common/Button';
import DivisionBar from '@components/common/DivisionBar';
import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import AskPriceModal from '@components/auction/AskPriceModal';
import useGetBiddingHistory from '@hooks/queries/auction/useGetBiddingHistory';
import { priceToString } from '@utils/priceToString';
import { useCountDown } from '@hooks/useCountDown';
import Loader from '@components/common/Loader';
import { leatAskPrice } from '@utils/leastAskPrice';
import usePutBiddng from '@hooks/mutations/usePutBidding';

interface inputForm {
  singlePrice: string;
  autoPrice: string;
}

export function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default function Bidding({ params }) {
  const router = useRouter();
  const artWorkId = params?.id;
  const { data, isLoading } = useGetBiddingHistory(+artWorkId);
  const { artWork, auction, biddingList, totalBiddingCount } = data || {};
  const { mutate, isLoading: isBiddingLoading } = usePutBiddng(artWorkId);
  const [days, hours, minutes, seconds] = useCountDown?.(
    auction?.endDate || '',
  );
  const remaind = +days + +hours + +minutes + +seconds;
  const [isBlurred, setIsBlurred] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<inputForm>({
    mode: 'onChange',
  });

  const [isModal, setIsModal] = useState<boolean>(false);

  const handleSinglePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.replace(/,/g, '');
    setValue('singlePrice', value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    if (isBlurred) trigger();
  };

  const handleAutoPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.replace(/,/g, '');
    setValue('autoPrice', value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    if (isBlurred) trigger();
  };

  const onSubmit = (form: inputForm) => {
    const singlePrice = form.singlePrice.replace(/,/g, '');
    // const autoPrice = form.autoPrice.replace(/,/g, '');
    mutate({ price: +singlePrice });
  };

  if (isLoading || isBiddingLoading) return <Loader />;

  return (
    <Layout>
      <Navigate
        isLeftButton={false}
        className="text-18 font-medium"
        message="응찰내역"
        handleRightButton={() => router.push('/auction')}
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
                {artWork?.title}
              </p>
              <p className="mt-1 text-[12.44px] text-font-500">
                {artWork?.artistName}
                <span className="ml-[6px]">{artWork?.genre}</span>
              </p>
              <div className="mt-3 text-[13px] font-medium text-font-500">
                <p className="leading-5">
                  현재가
                  <span className="ml-2 text-brand">
                    KRW {artWork?.topPrice && priceToString(artWork?.topPrice)}
                    (응찰 {totalBiddingCount})
                  </span>
                </p>
                <p className="leading-5">
                  시작가
                  <span className="ml-2 font-semibold text-[#191919]">
                    KRW{' '}
                    {artWork?.beginPrice && priceToString(artWork?.beginPrice)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className="mt-5 flex h-[70px] items-center rounded-xl border border-[#D9D9D9]">
          <div className="flex w-2/5 flex-col items-center border-r border-[#D9D9D9]">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="ml-1 text-14">남은시간</span>
            </p>
            <p className="w-full text-center text-16 font-semibold">
              {remaind > 0 ? (
                days ? (
                  <p>
                    {days}일 {hours}:{minutes}:{seconds}
                  </p>
                ) : (
                  <p>
                    {hours}:{minutes}:{seconds}
                  </p>
                )
              ) : (
                '경매종료'
              )}
            </p>
          </div>
          <div className="flex w-3/5 flex-col items-center">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="ml-1 text-14">시작시간</span>
            </p>
            <p className="text-16 font-semibold">
              {auction?.startDate.split('-').slice(0, 3).join('-') +
                ' ' +
                auction?.startDate.split('-').slice(3, 5).join(':')}
            </p>
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
            {biddingList && biddingList.length > 0 ? (
              <tr className="h-10">
                <td className="text-left">이름</td>
                <td>금액</td>
                <td>날짜</td>
                <td>시간</td>
              </tr>
            ) : (
              <div className="my-10">
                현재 입찰한 사람이 존재 하지 않습니다.
              </div>
            )}
            {biddingList && biddingList.length > 0 && (
              <>
                <div className="absolute -left-6 top-10 z-10 h-10 w-[calc(100%+48px)] bg-brand opacity-25" />
                <tr className="h-10">
                  <td className="text-left">{biddingList[0].memberName}</td>
                  <td className="font-bold text-brand">
                    {priceToString(biddingList[0].price)}
                  </td>
                  <td>
                    {biddingList[0].date.split('-').slice(0, 3).join('-')}
                  </td>
                  <td>
                    {biddingList[0].date.split('-').slice(3, 6).join(':')}
                  </td>
                </tr>
              </>
            )}
            {biddingList &&
              biddingList.length >= 1 &&
              biddingList.slice(1).map((bidding) => (
                <tr className="h-10">
                  <td className="text-left">{bidding.memberName}</td>
                  <td className="font-bold">{priceToString(bidding.price)}</td>
                  <td>{bidding.date.split('-').slice(0, 3).join('-')}</td>
                  <td>{bidding.date.split('-').slice(3, 6).join(':')}</td>
                </tr>
              ))}
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
          <div className="w-9/12">
            <input
              placeholder="금액을 입력해주세요."
              className="placeholder:text-normal h-[42px] w-full  appearance-none rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] placeholder:text-14"
              type="text"
              {...register('singlePrice', {
                required: false,
                validate: (value) => {
                  if (value) {
                    if (
                      +value.replace(/,/g, '') <
                      leatAskPrice(artWork?.topPrice!)
                    )
                      return '호가 단위를 확인해주세요.';
                  }
                },
              })}
              onChange={handleSinglePriceChange}
              onBlur={() => setIsBlurred(true)}
            />
          </div>
          <div className="box-border flex h-[42px] w-3/12 items-center justify-center rounded-[4px] border border-[#D8D8D8] text-14 font-medium ">
            1회 응찰
          </div>
        </article>
        {errors.singlePrice && (
          <ErrorMessage message={errors.singlePrice.message} />
        )}
        <article
          className={`${
            errors.singlePrice ? 'mt-1' : 'mt-3'
          } flex items-center gap-3`}
        >
          <div className="w-9/12  ">
            <input
              placeholder="금액을 입력해주세요."
              className="placeholder:text-normal h-[42px] w-full  appearance-none rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] placeholder:text-14"
              type="text"
              {...register('autoPrice', {
                required: false,
                validate: (value) => {
                  if (value) {
                    if (
                      +value.replace(/,/g, '') <
                      leatAskPrice(artWork?.topPrice!)
                    )
                      return '호가 단위를 확인해주세요.';
                  }
                },
              })}
              onChange={handleAutoPriceChange}
              onBlur={() => setIsBlurred(true)}
            />
          </div>
          <div className="box-border flex h-[42px] w-3/12 items-center justify-center rounded-[4px] border border-[#D8D8D8] text-14 font-medium">
            자동 응찰
          </div>
        </article>
        {errors.autoPrice && (
          <ErrorMessage message={errors.autoPrice.message} />
        )}

        <Button text="응찰" className="mt-8 w-full" />
      </form>
      <AskPriceModal
        isModal={isModal}
        message="gg"
        onCloseModal={() => setIsModal(false)}
      />
    </Layout>
  );
}
