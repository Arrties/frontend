import profileApi from '@apis/profile/profileApi';
import Image from 'next/image';
import React from 'react';

interface NoticeItemProps {
  notice: {
    id: number;
    title: string;
    message: string;
    createdDate: string;
    link: string;
  };
  refetchNotice: () => void;
}

const icon = {
  '채팅 알림': 'chat',
  '작품 등록 완료': 'post',
  '작가 등록 완료': 'post',
  응찰: 'bid',
  '무제 작품 낙찰 성공': 'bid_success',
  '1대1 문의 알림': 'inquiry',
  '경매 등록 알림': 'post_auction',
  '전시회 등록 알림': 'post_exhibition',
  '작품 유찰 알림': 'bid_fail',
};

export default function NoticeItem({ notice, refetchNotice }: NoticeItemProps) {
  const handleRemove = async () => {
    await profileApi.deleteNotice(notice?.id);
    refetchNotice();
  };
  return (
    <li className="text-medium relative flex border-b-[1px] py-3 last:border-none">
      <Image
        alt=""
        src={`/svg/icons/notice/icon_notice_${icon[notice?.title]}.svg`}
        width="40"
        height="0"
        className="ml-2 mr-4"
      />
      <section className="flex flex-col leading-5">
        <p className="text-[12px] font-bold">{notice?.title}</p>
        <p className="flex justify-between text-[14px]">{notice.message}</p>
        <p className="text-[10px] text-[#999999]">{notice.createdDate}</p>
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
