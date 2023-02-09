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
  const { mutate, data, error } = usePostLogin();
  console.log(error);

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
  const router = useRouter();
  const onSubmit = async ({ userId, password }: Login) => {
    if (checkedTerm.includes('idSave')) {
      setLocalStorage('savedId', userId);
    }

    mutate({ userId, password });
  };

  useEffect(() => {
    if (data) {
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

  return (
    <Layout>
      <div className="mt-[33%] w-full">
        <div className="flex h-56 items-center justify-center">
          <Image
            alt=""
            src="/svg/icons/icon_logo_main.svg"
            width="60"
            height="0"
            className="flex items-center justify-center text-center text-2xl font-light"
          />
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
          <div className="mt-[10px] flex flex-col justify-start">
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
          <div className="mt-[14px] flex space-x-[22px]">
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
            <Button text="로그인" className="w-full" />
          </div>
          {/* <div className="mt-6 space-y-3">
            <div>
              <SocialLoginButton kind="kakao" />
            </div>
            <div>
              <SocialLoginButton kind="naver" />
            </div>
          </div> */}
          <p className="mt-3 w-full text-center text-12">
            계정을 잊으셨나요?&nbsp;
            <Link className="text-[#0099FF]" href="/auth/id">
              ID찾기
            </Link>
            &nbsp;또는&nbsp;
            <Link className="text-[#0099FF]" href="/auth/password">
              비밀번호 찾기
            </Link>
          </p>
          <p className="mt-12 mb-9 flex w-full items-center justify-center text-12 ">
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
