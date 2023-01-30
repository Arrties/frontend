import authApi from '@apis/auth/authApi';
import Button from '@components/common/Button';
import DoubleCheckButton from '@components/common/DoubleCheckButton';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@features/hooks';
import { setUserInfo } from '@features/user/userSlice';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useGetDuplicateCheck } from '@hooks/queries/useGetDuplicateCheck';

interface JoinForm {
  userId: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  email: string;
}

interface checkForm {
  id: boolean;
  nickname: boolean;
  email: boolean;
}

interface EnabledOptions {
  userId: string;
  nickname: string;
  email: string;
}

export default function Join02() {
  const [isValidate, setIsValidate] = useState<checkForm>({
    id: false,
    nickname: false,
    email: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<JoinForm>({ mode: 'onTouched' });

  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };

  const dispatch = useAppDispatch();

  const onSubmit = (form: JoinForm) => {
    const { userId, nickname, password, telephone, email } = form;
    if (!isValidate.id) {
      setError('userId', {
        type: 'id doublecheck',
        message: '아이디 중복확인을 해주세요.',
      });
      return;
    } else if (!isValidate.nickname) {
      setError('nickname', {
        type: 'password doublecheck',
        message: '닉네임 중복확인을 해주세요.',
      });
      return;
    } else if (!isValidate.email) {
      setError('email', {
        type: 'email doublecheck',
        message: '이메일 중복확인을 해주세요.',
      });
      return;
    }
    dispatch(
      setUserInfo({
        userId,
        nickname,
        password,
        telephone,
        email,
      }),
    );
    router.push('/auth/join03');
  };

  const [enabled, setEnabled] = useState<EnabledOptions>({
    userId: '',
    nickname: '',
    email: '',
  });

  const results = useGetDuplicateCheck(enabled);

  const id = watch('userId');
  const email = watch('email');
  const nickname = watch('nickname');

  useEffect(() => {
    setIsValidate({ ...isValidate, id: false });
    setEnabled((prev) => ({ ...prev, userId: '' }));
  }, [id]);
  useEffect(() => {
    setIsValidate({ ...isValidate, nickname: false });
    setEnabled((prev) => ({ ...prev, nickname: '' }));
  }, [nickname]);
  useEffect(() => {
    setIsValidate({ ...isValidate, email: false });
    setEnabled((prev) => ({ ...prev, email: '' }));
  }, [email]);
  const [idResult, nicknameResult, emailResult] = results;

  useEffect(() => {
    if (idResult.isSuccess) {
      setIsValidate((prev) => ({ ...prev, id: true }));
      clearErrors('userId');
    }

    if (nicknameResult.isSuccess) {
      setIsValidate((prev) => ({ ...prev, nickname: true }));
      clearErrors('nickname');
    }
    if (emailResult.isSuccess) {
      setIsValidate((prev) => ({ ...prev, email: true }));
      clearErrors('email');
    }
    if (idResult.error && idResult.error.code === 'EXIST_USER_ID') {
      setIsValidate((prev) => ({ ...prev, id: false }));
      setError('userId', {
        type: 'id doublecheck',
        message: '이미 존재하는 아이디 입니다.',
      });
    }
    if (
      nicknameResult.error &&
      nicknameResult.error.code === 'EXIST_USER_NICKNAME'
    ) {
      setIsValidate((prev) => ({ ...prev, nickname: false }));
      setError('nickname', {
        type: 'nickname doublecheck',
        message: '이미 존재하는 닉네임 입니다.',
      });
    }
    if (emailResult.error && emailResult.error.code === 'EXIST_USER_EMAIL') {
      setIsValidate((prev) => ({ ...prev, email: false }));
      setError('email', {
        type: 'email doublecheck',
        message: '이미 존재하는 이메일 입니다.',
      });
    }
  }, [idResult.isFetching, nicknameResult.isFetching, emailResult.isFetching]);

  return (
    <Layout>
      <Navigate
        message="회원가입"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <section className="mt-8">
        <p className="mb-[12px]">
          <span className="text-brand">회원정보</span>를 입력해주세요
        </p>
      </section>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <section className="relative mb-3">
          <Input
            type="text"
            label="ID"
            placeholder="영문+숫자 조합 5자리 이상 입력해주세요."
            $error={!!errors.userId}
            register={register('userId', {
              required: true,
              pattern: {
                value: /^[a-z0-9]{5,19}$/g,
                message: '아이디 형식에 맞게 입력해주세요.',
              },
            })}
          />
          <DoubleCheckButton
            $valid={!isValidate.id}
            onClick={() => setEnabled((prev) => ({ ...prev, userId: id }))}
            id="id"
            text={isValidate.id ? '사용가능' : '중복확인'}
          />
          {errors.userId && <ErrorMessage message={errors.userId.message} />}
        </section>
        <section className="relative mb-3">
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            $error={!!errors.nickname}
            register={register('nickname', {
              required: true,
              pattern: {
                value: /^[가-힣A-Za-z0-9]{1,5}$/g,
                message: '최대 5자 까지 입력 가능합니다.',
              },
            })}
          />
          <DoubleCheckButton
            $valid={!isValidate.nickname}
            onClick={() => setEnabled((prev) => ({ ...prev, nickname }))}
            id="nickname"
            text={isValidate.nickname ? '사용가능' : '중복확인'}
          />
          {errors.nickname && (
            <ErrorMessage message={errors.nickname.message} />
          )}
        </section>
        <section className="mb-3">
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문+숫자 조합 8자리 이상 입력해주세요."
            $error={!!errors.password}
            register={register('password', {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9]{8,15}$/,
                message: '비밀번호를 형식에 맞게 입력해주세요.',
              },
            })}
            className="mb-0"
          />
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            $error={!!errors.confirmPassword}
            register={register('confirmPassword', {
              required: true,
              validate: (value: string) => {
                if (watch('password') !== value)
                  return '비밀번호가 일치하지 않습니다.';
              },
            })}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          {errors.confirmPassword && !errors.password && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
        </section>
        <section className="mb-3">
          <Input
            type="text"
            label="휴대폰 번호"
            placeholder="-를 제외하고 입력해주세요."
            $error={!!errors.telephone}
            register={register('telephone', {
              required: true,
              pattern: {
                value: /^01([0|1|6|7|8|9])[0-9]{4}[0-9]{4}$/g,
                message: '휴대폰번호를 정확히 입력해주세요.',
              },
            })}
          />
          {errors.telephone && (
            <ErrorMessage message={errors.telephone.message} />
          )}
        </section>
        <section className="relative mb-3">
          <Input
            type="email"
            label="이메일"
            placeholder="ATTIES@naver.com"
            $error={!!errors.email}
            register={register('email', {
              required: true,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          {errors.email && errors.email.message && (
            <ErrorMessage message={errors.email.message} />
          )}
          <DoubleCheckButton
            $valid={!isValidate.email}
            onClick={() => setEnabled((prev) => ({ ...prev, email }))}
            id="email"
            text={isValidate.email ? '사용가능' : '중복확인'}
          />
        </section>

        <div className="h-[30px]" />

        <Button
          text="확인"
          className="absolute inset-x-0 bottom-[34px] m-auto"
        />
      </form>
    </Layout>
  );
}
