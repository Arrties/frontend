import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Input from '@components/common/Input';
import Button from 'stories/Button';
import adminApi from '@apis/admin/admin';

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
    </Layout>
  );
}
