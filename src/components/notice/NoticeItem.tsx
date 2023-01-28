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

export default function NoticeItem({ notice, refetchNotice }: NoticeItemProps) {
  const handleRemove = async () => {
    await profileApi.deleteNotice(notice?.id);
    await refetchNotice();
    //알림 제거 API
  };
  return (
    <li className="text-medium flex flex-col border-b-[1px] last:border-none">
      <div className="flex justify-between pt-4">
        <span className="text-15 font-bold">{notice.message}</span>
        <Image
          src="/svg/icons/icon_grayClose.svg"
          alt="close"
          width={20}
          height={20}
          className="ml-2"
          onClick={handleRemove}
        />
      </div>
      <span className="mt-[6px] mb-4 text-10 text-[#999999]">
        {notice.createdDate}
      </span>
    </li>
  );
}
