import tw from 'tailwind-styled-components';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useGetIsNotice from '@hooks/queries/useGetIsNotice';
import { getToken, setToken } from '@utils/localStorage/token';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setNotice } from '@features/noticeSlice';

interface NoticeIconProps {
  isSearch?: boolean;
  [key: string]: any;
}

const NoticeIconTag = tw.div<defaultProps>`
flex w-[60px] justify-between 
`;

interface ToastProps {
  setToast: (value: boolean) => void;
  text: string;
  [key: string]: any;
}

function Toast({ setToast, text }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);
  return (
    <div className="animate-bounce4 fixed inset-x-0 top-8 m-auto flex h-[80px] w-[300px] flex-col items-start gap-2 rounded-2xl bg-[#F5F5F5] p-3 opacity-80">
      <div className="flex gap-2">
        <div className="flex h-[20px] w-[20px] items-center justify-center rounded bg-[#FC6554]">
          <Image
            alt="logo"
            src="/svg/icons/icon_logo_brand.svg"
            width="15"
            height="0"
          />
        </div>
        <span>Atties</span>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default React.memo(function NoticeIcon({
  isSearch = true,
  ...rest
}: NoticeIconProps) {
  const router = useRouter();
  const { data } = useGetIsNotice();
  const isNotice = data?.newNotification;
  const isArtist = data?.isArtist;
  const [toast, setToast] = useState(false);
  const dispatch = useAppDispatch();
  if (isArtist === true && getToken().roles !== 'ROLE_ARTIST') {
    setToken({
      accessToken: getToken().accessToken,
      refreshToken: getToken().refreshToken,
      roles: 'ROLE_ARTIST',
    });
  }
  const { isNotice: prevIsNotice } = useAppSelector((state) => state.notice);

  useEffect(() => {
    if (isNotice && !prevIsNotice) {
      setToast(true);
      dispatch(setNotice({ isNotice: true }));
    }
  }, [isNotice]);

  return (
    <NoticeIconTag {...rest}>
      {toast && <Toast setToast={setToast} text="알림이 도착하였습니다.🔔" />}
      {isSearch ? (
        <Image
          alt="search"
          src="/svg/icons/icon_search.svg"
          width="22"
          height="22"
          onClick={() => {
            router.push('/search');
          }}
        />
      ) : (
        <div></div> // 정렬을 위한 빈 div 태그
      )}
      {isNotice && (
        <div className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-brand " />
      )}
      <Image
        alt="notification"
        src="/svg/icons/icon_notification.svg"
        width={22}
        height={22}
        onClick={() => {
          router.push('/notice');
        }}
      />
    </NoticeIconTag>
  );
});
