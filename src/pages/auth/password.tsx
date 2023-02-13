import authApi from '@apis/auth/authApi';
import Button from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePostFindPassword from '@hooks/mutations/usePostFindPassword';
import Loader from '@components/common/Loader';

interface NewPasswordForm {
  email: string;
}

function Password() {
  const { register, handleSubmit } = useForm<NewPasswordForm>();
  const [isModal, setIsModal] = useState(false);
  const { mutate, isError, isLoading, isSuccess } = usePostFindPassword();

  if (isLoading) return <Loader />;
  const onSubmit = async ({ email }: NewPasswordForm) => {
    mutate(email);
    if (isSuccess) {
      setIsModal(true);
    }
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
          message="임시 비밀번호를 전송했습니다."
        />
      )}
      <Navigate
        message="비밀번호 찾기"
        handleRightButton={() => {
          router.push('/auth/login');
        }}
      />
      <section className="py-5">
        <p className="text-[18px] font-semibold">
          소중한 개인정보를 위하여 <br />
          <span className="text-brand">본인확인</span>이 필요합니다.
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="py-2">
          <Input
            type="email"
            placeholder="example@naver.com"
            className="placeholder:underline"
            register={register('email', {
              required: true,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일을 형식에 맞게 입력해주세요.',
              },
            })}
          />
          {isError && <ErrorMessage message="가입되지 않은 이메일입니다." />}
        </section>
        <section className="text-12 text-[#999999]">
          이메일 주소를 입력해주시면 임시 비밀번호를 보내드립니다.
        </section>

        <Button
          text="확인"
          type="submit"
          className="absolute inset-x-0 bottom-[34px] m-auto w-[calc(100%-48px)]"
        />
      </form>
    </Layout>
  );
}

export default Password;
