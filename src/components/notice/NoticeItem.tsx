import profileApi from '@apis/profile/profileApi';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import useDeleteNotice from '@hooks/mutations/useDeleteNotice';

interface NoticeItemProps {
  notice: Notice;
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  const router = useRouter();
  const { mutate: deleteNotice } = useDeleteNotice(notice.id);

  const modifiedDate = moment(notice.modifiedDate)
    .fromNow()
    .replace('days', '일')
    .replace('hours', '시간')
    .replace('ago', '전');
  let title: string = notice.title;
  if (
    ['작품 등록 완료', '작가 등록 완료', '작품 낙찰 성공'].includes(
      notice?.title,
    )
  ) {
    title += ' 🎉';
  }

  const icon = {
    '작가 등록 완료 🎉': ['post', '/profile/edit'],
    '작품 등록 완료 🎉': ['post', `/auction/${notice.data}`],
    '경매 등록 알림': ['post_auction', `/auction/${notice.data}`],
    '전시회 등록 알림': ['post_exhibition', '/exhibition'],
    '작품 유찰 알림': ['bid_fail', ''],

    '입찰 알림': ['bid_fail', `/auction/bidding/${notice.data}`],
    '입찰 경쟁 알림': ['inquiry', `/auction/bidding/${notice.data}`],

    '작품 낙찰 성공 🎉': ['bid_success', '/profile/bid'],
    '1대1 문의 알림': ['inquiry', '/inquiry'],
    채팅: ['chat', `/chat`],
  };

  return (
    <li className="text-medium relative flex border-b-[1px] py-3 last:border-none">
      <Image
        alt="notice_icon"
        src={`/svg/icons/notice/icon_notice_${
          icon[title] && icon[title][0]
        }.svg`}
        width={37}
        height={37}
        className="ml-1 mr-3"
      />
      <section
        className="flex cursor-pointer flex-col leading-5"
        onClick={() => {
          router.push(icon[title][1]);
        }}
      >
        <p className="text-[12px] font-bold">{title}</p>
        <p className="flex w-[260px] justify-between text-[14px]">
          {notice.message}
        </p>
        <p className="text-[10px] text-[#999999]">{modifiedDate}</p>
      </section>
      <Image
        src="/svg/icons/icon_grayClose.svg"
        alt="close"
        width={25}
        height={0}
        className="absolute inset-y-0 right-[10px] bottom-0 top-0 m-auto cursor-pointer"
        onClick={() => deleteNotice()}
      />
    </li>
  );
}
