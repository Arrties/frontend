import Button from '@components/common/Button';
import CheckBox from '@components/common/Checkbox';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import SocialLoginButton from '@components/login/SocialLoginButton';
import usePostLogin from '@hooks/mutations/usePostLogin';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { deleteToken, setToken, Token } from '@utils/localStorage/token';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage/helper';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Loader from '@components/common/Loader';
import { setCookie } from '@utils/cookies';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@features/token/tokenSlice';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Login>({
    defaultValues: {
      userId: getLocalStorage('savedId') || '',
    },
  });
  const [checkedTerm, setCheckedTerm] = useState<string[]>([]);
  const { mutate, data, error, isLoading: isLoadingLogin } = usePostLogin();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteToken();
    if (getLocalStorage('idSave') === 'true') {
      setCheckedTerm(['idSave']);
    }
  }, []);

  useEffect(() => {
    if (checkedTerm.includes('idSave')) {
      setLocalStorage('idSave', 'true');
    } else {
      setLocalStorage('idSave', 'false');
      removeLocalStorage('savedId');
    }
  }, [checkedTerm]);

  const onChecked = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedTerm([...checkedTerm, id]);
    } else if (!checked && checkedTerm.includes(id)) {
      setCheckedTerm(checkedTerm.filter((el: string) => el !== id));
    }
  };
  const onSubmit = async ({ userId, password }: Login) => {
    if (checkedTerm.includes('idSave')) {
      setLocalStorage('savedId', userId);
    }
    mutate({ userId, password });
  };

  useEffect(() => {
    if (data && data.refreshToken && data.accessToken) {
      setCookie('refreshTokenk', data.refreshToken, {
        path: '/',
        secure: '/',
        exprires: new Date().getMinutes() + 30,
      });

      dispatch(setAccessToken({ accessToken: data.accessToken }));

      const token: Token = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        roles: data.roles,
      };
      if (token) setToken(token);
      if (data.roles === 'ROLE_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/home');
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.code === 'UNAUTHORIZED_ID') {
        setError('userId', {
          type: 'unauthorized',
          message: error.detail,
        });
      } else if (error.code === 'UNAUTHORIZED_PASSWORD') {
        setError('password', {
          type: 'unauthorized',
          message: error.detail,
        });
      }
    }
  }, [error]);

  if (isLoadingLogin) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="mt-[10%] w-full">
        <div className="flex h-40 items-center justify-center">
          <Image
            alt="logo"
            src="/svg/icons/logo_main.svg"
            width="60"
            height="60"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input
              type="text"
              id="id"
              placeholder="아이디를 입력해 주세요."
              register={register('userId', { required: true })}
              autoComplete="on"
            />
            {errors.userId && <ErrorMessage message={errors.userId.message} />}
          </div>
          <div className="mt-[0.625rem] flex flex-col justify-start">
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              register={register('password', {
                required: true,
              })}
              autoComplete="on"
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="mt-[0.875rem] flex space-x-[1.375rem]">
            <CheckBox
              kind="radio"
              id="autoSave"
              label="자동 로그인"
              isChecked={checkedTerm.includes('autoSave')}
              handler={(e) => onChecked(e.target.checked, e.target.id)}
            />
            <CheckBox
              kind="radio"
              label="아이디 저장"
              id="idSave"
              isChecked={checkedTerm.includes('idSave')}
              handler={(e) => onChecked(e.target.checked, e.target.id)}
            />
          </div>
          <div className="mt-[2.125rem]">
            <Button text="로그인" className="w-full" />
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <SocialLoginButton kind="kakao" />
            </div>
            <div>
              <SocialLoginButton kind="naver" />
            </div>
          </div>
          <p className="mt-3 w-full text-center text-12">
            계정을 잊으셨나요?&nbsp;
            <Link className="text-12 text-[#0099FF]" href="/auth/id">
              ID찾기
            </Link>
            &nbsp;또는&nbsp;
            <Link className="text-12 text-[#0099FF]" href="/auth/password">
              비밀번호 찾기
            </Link>
          </p>
          <p className="mb-9 mt-12 flex w-full items-center justify-center text-12 ">
            <span className="text-[#999999]">아직 회원이 아니신가요?</span>
            <Link className="ml-[0.125rem]" href="/auth/join01">
              회원가입
            </Link>
            <Image
              src="/svg/icons/front.svg"
              alt="join"
              width={12}
              height={12}
            />
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
