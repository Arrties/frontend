import Image from 'next/image';
import React from 'react';

interface NoticeItemProps {
  noticeList: { text: string; date: string; id: number }[];
  handler: (e: number) => void;
}

export default function NoticeItem({ noticeList, handler }: NoticeItemProps) {
  console.log(noticeList);
  return (
    <ul>
      {noticeList.map((notice, idx) => (
        <li
          key={idx}
          className="text-medium flex flex-col last:border-none border-b-[1px]"
        >
          <div className="flex justify-between pt-4">
            <span className="font-bold">{notice.text}</span>
            <button onClick={() => handler(notice.id)}>
              <Image
                src="/svg/icons/icon_grayClose.svg"
                alt="close"
                width={20}
                height={20}
                className="ml-3"
              />
            </button>
          </div>
          <span className="text-xs text-[#999999] mt-[6px] mb-4">
            {notice.date}
          </span>
        </li>
      ))}
    </ul>
  );
}
