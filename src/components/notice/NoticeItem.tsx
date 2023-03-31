import moment from 'moment';
import 'moment/locale/ko';

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
    '작품 등록 완료 🎉': ['post', `/auction/view?id=${notice.data}`],
    '경매 등록 알림': ['post_auction', `/auction/bidding?id=${notice.data}`],
    '전시회 등록 알림': ['post_exhibition', '/exhibition'],
    '작품 유찰 알림': ['bid_fail', ''],

    '입찰 알림': ['bid', `/auction/bidding?id=${notice.data}`],
    '입찰 경쟁 알림': ['bid_fail', `/auction/bidding?id=${notice.data}`],

    '작품 낙찰 성공 🎉': ['bid_success', '/profile/bid'],
    '1대1 문의 알림': ['inquiry', '/profile/inquiry'],
    채팅: ['chat', `/chat`],
  };

  return (
    <li className="text-medium relative flex justify-between border-b-[0.0625rem] py-3 last:border-none">
      <div className="flex">
        <Image
          alt="notice_icon"
          src={`/svg/icons/notice/notice_${icon[title] && icon[title][0]}.svg`}
          width={37}
          height={37}
          className="mr-3"
        />
        <section
          className="flex cursor-pointer flex-col leading-5"
          onClick={() => {
            // deleteNotice();
            router.push(icon[title][1]);
          }}
        >
          <p className="text-[0.75rem] font-bold">{title}</p>
          <p className="flex justify-between text-[0.875rem]">{notice.message}</p>
          <p className="text-[0.625rem] text-[#999999]">{modifiedDate}</p>
        </section>
      </div>
      <Image
        src="/svg/icons/grayClose.svg"
        alt="close"
        width={25}
        height={0}
        className="cursor-pointer"
        onClick={() => deleteNotice()}
      />
    </li>
  );
}
