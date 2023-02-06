import profileApi from '@apis/profile/profileApi';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

interface NoticeItemProps {
  notice: Notice;
  refetchNotice: () => void;
}

export default function NoticeItem({ notice, refetchNotice }: NoticeItemProps) {
  const router = useRouter();
  const handleRemove = async (e) => {
    e.stopPropagation();
    await profileApi.deleteNotice(notice?.id);
    refetchNotice();
  };
  let date = moment(notice.modifiedDate)
    .fromNow()
    .replace('days', '일')
    .replace('hours', '시간')
    .replace('ago', '전');

  const icon = {
    '채팅 알림': ['chat', '/chat'],
    '작품 등록 완료': ['post', `/auction/${notice.data}`],
    '작가 등록 완료': ['post', '/profile'],
    응찰: ['bid', '/auction'],
    '무제 작품 낙찰 성공': ['bid_success', '/auction'],
    '1대1 문의 알림': ['inquiry', '/inquiry'],
    '경매 등록 알림': ['post_auction', '/auction'],
    '전시회 등록 알림': ['post_exhibition', '/exhibition'],
    '작품 유찰 알림': ['bid_fail', '/auction'],
    '입찰 경쟁 알림': ['inquiry', '/auction'],
    '입찰 알림': ['inquiry', '/auction'],
  };

  return (
    <li
      className="text-medium relative flex border-b-[1px] py-3 last:border-none"
      onClick={() => {
        router.push(icon[notice?.title][1]);
      }}
    >
      <Image
        alt="notice_icon"
        src={`/svg/icons/notice/icon_notice_${
          icon[notice?.title] && icon[notice?.title][0]
        }.svg`}
        width="40"
        height="0"
        className="ml-2 mr-4"
      />
      <section className="flex flex-col leading-5">
        <p className="text-[12px] font-bold">{notice?.title}</p>
        <p className="flex w-[240px] justify-between text-[14px]">
          {notice.message}
        </p>
        <p className="text-[10px] text-[#999999]">{date}</p>
      </section>
      <Image
        src="/svg/icons/icon_grayClose.svg"
        alt="close"
        width={25}
        height={0}
        className="absolute inset-y-0 right-[10px] bottom-0 top-0 m-auto cursor-pointer"
        onClick={handleRemove}
      />
    </li>
  );
}
