import tw from 'tailwind-styled-components';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useGetIsNotice from '@hooks/queries/useGetIsNotice';
import { getToken, setToken } from '@utils/localStorage/token';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setNotice } from '@features/noticeSlice';
import Toast from './Toast';

interface NoticeIconProps {
  isSearch?: boolean;
  [key: string]: any;
}

const NoticeIconTag = tw.div<defaultProps>`
flex w-[60px] justify-between 
`;

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
