import Layout from '@components/common/Layout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Input from '@components/common/Input';
import Button from 'stories/Button';
import adminApi from '@apis/admin/admin';
import useGetCertificationList from '@hooks/queries/admin/useGetCertificationList';
import Image from 'next/image';

interface InputForm {
  memberId: number;
  turn: number;
  startDate: string;
  endDate: string;
}

export default function Admin() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<InputForm>({
    defaultValues: {
      turn: 1,
      startDate: '2023-02-01T12:00:00',
      endDate: '2023-02-03T12:00:00',
    },
  });

  const onSubmitRole = async (form: InputForm) => {
    const { memberId } = form;
    await adminApi.patchRole(memberId);
    alert('전환 성공');
  };
  const onSubmitAuction = async (form: InputForm) => {
    const { turn, startDate, endDate } = form;
    await adminApi.postAuction({ turn, startDate, endDate });
  };

  const { data: certificationList } = useGetCertificationList();
  console.log(certificationList);
  const handleAccept = async (memberId: number) => {
    await adminApi.patchRole(memberId);
    alert('전환 성공');
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmitRole)}>
        <Input type="text" register={register('memberId')} />
        <Button text="작가 프로필 전환" className="w-full" />
      </form>
      <form onSubmit={handleSubmit(onSubmitAuction)}>
        <div>
          turn
          <Input type="text" register={register('turn')} />
        </div>
        <div>
          시작 날짜
          <Input type="text" register={register('startDate')} />
        </div>
        <div>
          종료 날짜
          <Input type="text" register={register('endDate')} />
        </div>
        <Button text="경매 생성" className="w-full" />
      </form>
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
    </Layout>
  );
}
