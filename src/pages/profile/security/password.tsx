import authApi from '@apis/auth/authApi'
import ErrorMessage from '@components/common/ErrorMessage'
import Input from '@components/common/Input'
import Layout from '@components/common/Layout'
import Navigate from '@components/common/Navigate'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface passwordForm {
  password: string;
  passwordConfirm: string;
}

export default function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<passwordForm>({ mode: 'onTouched' });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const password: string = watch('password');
  useEffect(() => {
    setSuccessMessage('');
  }, [password]);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const onSubmit = async () => {
    if (watch('password') !== watch('passwordConfirm')) {
      setError(
        'passwordConfirm',
        {
          type: 'password inCorrect',
          message: '비밀번호가 일치하지 않습니다.',
        },
        { shouldFocus: true },
      );
      return;
    }
    const res = await authApi.postPassword(watch('password'));
    if (res.status === 409) {
      setError('passwordConfirm', {
        type: 'password same',
        message: res.detail,
      });
    } else {
      setSuccessMessage('비밀번호 변경이 완료되었습니다.');
    }
  };

  return (
    <Layout>
      <Navigate
        message="비밀번호 변경"
        right_message="완료"
        handleRightButton={handleSubmit(onSubmit)}
      />
      <div className="relative   ">
        <Input
          label="비밀번호"
          placeholder="비밀번호"
          type={isShow ? 'text' : 'password'}
          register={register('password', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9]{8,15}$/,
              message: '영문+숫자 조합 8자리 이상 입력해주세요.',
            },
          })}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
        <Image
          alt="eye"
          src={`/svg/icons/icon_eye${isShow ? '_on' : ''}.svg`}
          width="25"
          height="0"
          className="absolute right-2 top-12"
          onClick={() => {
            setIsShow(!isShow);
          }}
        />
      </div>
      <div className="relative">
        <Input
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          type={isShowConfirm ? 'text' : 'password'}
          register={register('passwordConfirm', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9]{8,15}$/,
              message: '영문+숫자 조합 8자리 이상 입력해주세요.',
            },
          })}
        />
        {errors.passwordConfirm && (
          <ErrorMessage message={errors.passwordConfirm.message} />
        )}
        <Image
          alt="eye"
          src={`/svg/icons/icon_eye${isShowConfirm ? '_on' : ''}.svg`}
          width="25"
          height="0"
          className="absolute right-2 top-12"
          onClick={() => {
            setIsShowConfirm(!isShowConfirm);
          }}
        />
      </div>
      {successMessage && (
        <p className="text-[#5a82f1] text-14">비밀번호 변경 성공</p>
      )}
    </Layout>
  );
}
