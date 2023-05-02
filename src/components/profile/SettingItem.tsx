import authApi from '@apis/auth/authApi';
import arrow from '@public/svg/icons/arrow_light_gray.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { deleteToken } from '@utils/localStorage/token';
import React from 'react';

interface SettingItemProps {
  key: string;
  text: string;
  path: string;
}

export default React.memo(function SettingItem({
  text,
  path,
}: SettingItemProps) {
  const router = useRouter();
  const handleNavigate = async () => {
    if (text === '로그아웃') {
      await authApi.postLogout();
      deleteToken();
    }
    router.push(path);
  };
  return (
    <div
      className="flex cursor-pointer justify-between border-b-[0.0625rem] border-[#F4F4F4] py-[0.875rem] text-14 text-sm font-bold"
      onClick={handleNavigate}
    >
      <span>{text}</span>
      <button>
        <Image src={arrow} alt="arrow" />
      </button>
    </div>
  );
});
