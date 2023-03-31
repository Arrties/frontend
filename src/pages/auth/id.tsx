import authApi from '@apis/auth/authApi';
import Button from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePostFindId from '@hooks/mutations/usePostFindId';
import Loader from '@components/common/Loader';

interface FindIdForm {
  email: string;
}

function Id() {
  const { register, handleSubmit } = useForm<FindIdForm>();
  const [isModal, setIsModal] = useState(false);
  const { mutate, isError, isLoading, isSuccess } = usePostFindId();

  if (isLoading) return <Loader />;
  const onSubmit = async ({ email }: FindIdForm) => {
    mutate(email);
  };
  if (isSuccess && !isModal) {
    setIsModal(true);
  }
  const router = useRouter();
  return (
    <Layout>
      {isModal && (
        <Modal
          isModal={isModal}
          onCloseModal={() => {
            router.push('/auth/login');
          }}
          message="입력하신 주소로 확인 메일을 보내드렸습니다."
        />
      )}
      <Navigate
        message="아이디 찾기"
        handleRightButton={() => {
          router.push('/auth/login');
        }}
      />
      <section className="py-5">
        <p className="text-16 font-semibold">
          소중한 개인정보를 위하여 <br />
          <span className="text-brand">본인확인</span>이 필요합니다.
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-2 py-2">
          <Input
            type="email"
            placeholder="이메일을 입력해주세요. (@포함)"
            register={register('email', {
              required: true,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일을 형식에 맞게 입력해주세요.',
              },
            })}
          />
          {isError && <ErrorMessage message="존재하지 않는 이메일입니다." />}
        </section>

        <Button
          text="확인"
          type="submit"
          className="absolute inset-x-0 bottom-[2.125rem] m-auto w-[calc(100%-48px)]"
        />
      </form>
    </Layout>
  );
}

export default Id;
