import authApi from '@apis/auth/authApi';
import Button from '@components/common/Button';
import CheckBox from '@components/common/Checkbox';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import SocialLoginButton from '@components/login/SocialLoginButton';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { setToken, Token } from '@utils/localStorage/token';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage/helper';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface LoginForm {
  userId: string | null;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    defaultValues: {
      userId: getLocalStorage('savedId'),
    },
  });
  const [checkedTerm, setCheckedTerm] = useState<string[]>([]);
  useEffect(() => {
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
  const router = useRouter();
  const onSubmit = async ({ userId, password }: LoginForm) => {
    if (checkedTerm.includes('idSave')) {
      setLocalStorage('savedId', userId);
    }
    const res = await authApi.postLogin({
      userId,
      password,
    });

    if (res?.status === 200) {
      const token: Token = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        roles: res.data.roles,
      };
      if (token) setToken(token);
      router.push('/home');
    } else if (res?.status === 401 && res?.data.code === 'UNAUTHORIZED_ID') {
      setError('userId', {
        type: 'unauthorized',
        message: '존재하지 않는 아이디입니다.',
      });
    } else if (
      res.status === 401 &&
      res.data.code === 'UNAUTHORIZED_PASSWORD'
    ) {
      setError('password', {
        type: 'unauthorized',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  return (
    <Layout>
      <div className="mx-auto w-full">
        <div className="text-center text-2xl font-light flex items-center justify-center h-48">
          LOGO
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <Input
              type="text"
              id="id"
              placeholder="아이디를 입력해 주세요."
              register={register('userId', { required: true })}
            />
            {errors.userId && <ErrorMessage message={errors.userId.message} />}
          </div>
          <div className="flex flex-col mt-[10px] justify-start">
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              register={register('password', {
                required: true,
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="flex space-x-[22px] mt-[14px]">
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
          <div className="mt-[34px]">
            <Button text="로그인" />
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <SocialLoginButton kind="kakao" />
            </div>
            <div>
              <SocialLoginButton kind="naver" />
            </div>
          </div>
          <p className="w-full text-center text-12 mt-3">
            계정을 잊으셨나요?&nbsp;
            <Link className="text-[#0099FF]" href="/auth/id">
              ID찾기
            </Link>
            &nbsp;또는&nbsp;
            <Link className="text-[#0099FF]" href="/auth/password">
              비밀번호 찾기
            </Link>
          </p>
          <p className="flex justify-center items-center w-full text-12 mt-24">
            <span className="text-[#999999]">아직 회원이 아니신가요?</span>
            <Link className="ml-[2px]" href="/auth/join01">
              회원가입
            </Link>
            <Image
              src="/svg/icons/icon_front.svg"
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
