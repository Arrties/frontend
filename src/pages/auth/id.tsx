import authApi from '@apis/auth/authApi'
import Button from '@components/common/Button'
import ErrorMessage from '@components/common/ErrorMessage'
import Input from '@components/common/Input'
import Layout from '@components/common/Layout'
import Modal from '@components/common/Modal'
import Navigate from '@components/common/Navigate'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

interface FindIdForm {
  email: string;
}

function Id() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FindIdForm>();
  const [isModal, setIsModal] = useState(false);

  const onSubmit = async ({ email }: FindIdForm) => {
    if (email) {
      const res = await authApi.postFindId(email);
      if (res.status === 200) {
        setIsModal(true);
      } else if (res.status === 404 && res.data.code === 'NOT_FOUND_EMAIL') {
        setError('email', {
          type: 'not found',
          message: res.data.detail,
        });
      }
    }
  };

  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/login');
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };
  const onCloseModal = () => {
    setIsModal(false);
  };

  return (
    <Layout>
      {isModal && (
        <Modal
          isModal={isModal}
          onCloseModal={onCloseModal}
          message="입력하신 주소로 확인 메일을 보내드렸습니다."
        />
      )}
      <Navigate
        message="아이디 찾기"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <section className="py-5">
        <p className="text-16 font-semibold">
          소중한 개인정보를 위하여 <br />
          <span className="text-[#F5535D]">본인확인</span>이 필요합니다.
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="py-2 space-y-2">
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
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </section>
        <div className="h-[400px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}

export default Id;
