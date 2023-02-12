import Layout from '@components/common/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Input from '@components/common/Input';
import Button from 'stories/Button';
import adminApi from '@apis/admin/admin';
import useGetCertificationList from '@hooks/queries/admin/useGetCertificationList';
import Image from 'next/image';
import { getToken } from '@utils/localStorage/token';
import useGetAuction from '@hooks/queries/auction/useGetAuction';
import useGetPastAuction from '@hooks/queries/auction/useGetPastAuction';
import useGetAsk from '@hooks/queries/admin/useGetAsk';
import PastAuctionList from '@components/admin/PastAuctionList';

export default function Admin() {
  const router = useRouter();
  const { data: auctionList } = useGetAuction();
  const { data: pastAuctionList } = useGetPastAuction() || {};

  const { data: askList, refetch: refetchAskList } = useGetAsk();
  const { data: certificationList } = useGetCertificationList();
  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    if (getToken().roles !== 'ROLE_ADMIN') {
      alert('접속할 수 없는 페이지입니다.');
      router.push('/home');
    }
  }, []);

  const onSubmitRole = async (form) => {
    const { memberId } = form;
    await adminApi.patchRole(memberId);
    alert('전환 성공');
  };
  const onSubmitAuction = async (form) => {
    const { turn, startDate, endDate } = form;
    await adminApi.postAuction({ turn, startDate, endDate });
  };

  const handleAccept = async (memberId: number) => {
    await adminApi.patchRole(memberId);
    alert('전환 성공');
  };

  const onSubmitAsk = (form, e) => {
    const id = e.target.id;
    adminApi.postAnswer(+id, { answer: form[`answer-${id}`] });
    alert('답변에 성공하였습니다.');
    refetchAskList();
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmitRole)}
        className="mt-5 flex items-center"
      >
        <Input
          type="text"
          register={register('memberId')}
          className="w-[170px]"
        />
        <Button text="작가 프로필 전환" className="w-[170px]" />
      </form>

      <form
        onSubmit={handleSubmit(onSubmitAuction)}
        className="mt-5 text-center"
      >
        <p className=" text-[#9B111E]">지난 경매와 안곂치도록 주의해주세요</p>
        <p className="text-14">날짜 예시 : 2023-02-01T12:00:00</p>
        <article className="flex items-center">
          <div className="w-[50px]">
            <p className="text-center">turn</p>
            <Input type="text" register={register('turn')} />
          </div>
          <div className="w-[250px]">
            <p className="text-center">시작 날짜</p>

            <Input
              type="text"
              register={register('startDate')}
              defaultValue="2023-02-01T12:00:00"
            />
          </div>
          <div className="w-[250px]">
            <p className="text-center">종료 날짜</p>
            <Input
              type="text"
              register={register('endDate')}
              defaultValue="2023-02-01T12:00:00"
            />
          </div>
        </article>
        <article>
          <Button text="경매 생성" className=" w-full" />
        </article>
      </form>
      <PastAuctionList
        auctionList={auctionList}
        pastAuctionList={pastAuctionList}
      />
      {!!certificationList &&
        certificationList.map((certificationItem) => (
          <div key={certificationItem?.id}>
            <span>id:{certificationItem?.id}</span>
            <Image
              alt="image"
              src={certificationItem?.certificationImage}
              width="100"
              height="0"
            />
            <Button
              text="수락하기"
              onClick={() => {
                handleAccept(certificationItem?.id);
              }}
              className="w-full"
            />
          </div>
        ))}

      <section>
        {!!askList &&
          askList.map((ask) => (
            <div key={ask.id} className="rounded border py-2 px-3">
              <p>제목 : {ask.title}</p>
              <p>내용 : {ask.content}</p>
              <p>날짜 : {ask.date}</p>
              <p>상태 : {ask.status}</p>
              <form
                className="flex items-center"
                onSubmit={handleSubmit(onSubmitAsk)}
                id={ask.id}
              >
                <Input
                  type="text"
                  className="w-[250px]"
                  register={register(`answer-${ask.id}`)}
                />
                <Button text="답변" className="w-[70px]" />
              </form>
            </div>
          ))}
      </section>
    </Layout>
  );
}
