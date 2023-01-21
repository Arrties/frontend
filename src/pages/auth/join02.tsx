import authApi from '@apis/auth/authApi'
import Button from '@components/common/Button'
import DoubleCheckButton from '@components/common/DoubleCheckButton'
import ErrorMessage from '@components/common/ErrorMessage'
import Input from '@components/common/Input'
import Layout from '@components/common/Layout'
import Navigate from '@components/common/Navigate'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@features/hooks'
import { setUserInfo } from '@features/user/userSlice'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

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

  const id = watch('userId');
  const email = watch('email');
  const nickname = watch('nickname');

  useEffect(() => {
    setIsValidate({ ...isValidate, id: false });
  }, [id]);
  useEffect(() => {
    setIsValidate({ ...isValidate, nickname: false });
  }, [nickname]);
  useEffect(() => {
    setIsValidate({ ...isValidate, email: false });
  }, [email]);

  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };

  const dispatch = useAppDispatch();

  const onSubmit = async (form: JoinForm) => {
    const { userId, nickname, password, telephone, email } = form;
    if (!isValidate.id) {
      setError('userId', {
        type: 'id doublecheck',
        message: '아이디 중복확인을 해주세요.',
      });
      return;
    } else if (!isValidate.nickname) {
      setError('password', {
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

  const handleValidateCheck = async (e: { target: { id: string } }) => {
    let data: { status: number };
    switch (e.target.id) {
      case 'id':
        if (!id || id === '') {
          setError('userId', {
            type: 'userId is null',
            message: '아이디를 입력해주세요.',
          });
          return;
        }
        data = await authApi.getCheckId(id);
        if (data?.status === 409) {
          setError('userId', {
            type: 'id duplicate',
            message: '이미 사용중인 아이디 입니다.',
          });
          setIsValidate({ ...isValidate, id: false });
          return;
        } else {
          setIsValidate({ ...isValidate, id: true });
          clearErrors('userId');
        }
        break;
      case 'nickname':
        if (!nickname || nickname === '') {
          setError('nickname', {
            type: 'nickname is null',
            message: '닉네임을 입력해주세요.',
          });
          return;
        }
        data = await authApi.getCheckNickname(nickname);
        if (data?.status === 409) {
          setError('nickname', {
            type: 'nickname duplicate',
            message: '이미 사용중인 닉네임 입니다.',
          });
          setIsValidate({ ...isValidate, nickname: false });
          return;
        } else {
          setIsValidate({ ...isValidate, nickname: true });
          clearErrors('userId');
        }
        break;
      case 'email':
        if (!email || email === '') {
          setError('email', {
            type: 'Email is null',
            message: '이메일을 입력해주세요.',
          });
          return;
        }
        data = await authApi.getCheckEmail(email);
        if (data?.status === 409) {
          setError('email', {
            type: 'email duplicate',
            message: '이미 사용중인 이메일 입니다.',
          });
          setIsValidate({ ...isValidate, email: false });
          return;
        } else {
          setIsValidate({ ...isValidate, email: true });
          clearErrors('email');
        }
        break;
    }
    return;
  };

  return (
    <Layout>
      <Navigate
        message="회원가입"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <section className="mt-8">
        <p className="mb-[12px]">
          <span className="text-[#F5535D]">회원정보</span>를 입력해주세요
        </p>
      </section>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-3 relative">
          <Input
            type="text"
            label="ID"
            placeholder="영문+숫자 조합 5자리 이상 입력해주세요."
            $error={errors.userId ? true : false}
            register={register('userId', {
              required: true,
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: '아이디 형식에 맞게 입력해주세요.',
              },
            })}
          />
          <DoubleCheckButton
            $valid={!isValidate.id}
            onClick={handleValidateCheck}
            id="id"
            text={isValidate.id ? '사용가능' : '중복확인'}
          />
          {errors.userId && <ErrorMessage message={errors.userId.message} />}
        </section>
        <section className="mb-3 relative">
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            $error={errors.nickname ? true : false}
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
            onClick={handleValidateCheck}
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
            $error={errors.password ? true : false}
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
            $error={errors.confirmPassword ? true : false}
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
            $error={errors.telephone ? true : false}
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
        <section className="mb-3 relative">
          <Input
            type="email"
            label="이메일"
            placeholder="ATTIES@naver.com"
            $error={errors.email ? true : false}
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
            onClick={handleValidateCheck}
            id="email"
            text={isValidate.email ? '사용가능' : '중복확인'}
          />
        </section>

        <div className="h-[30px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}
