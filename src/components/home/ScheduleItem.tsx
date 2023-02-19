import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import React from 'react';

interface ScheduleItemForm {
  auctionItem: AuctionList;
  [key: string]: any;
}

const ScheduleIconBox = tw.div<ScheduleItemForm>`
${({ status }) =>
  status === 'terminated'
    ? 'bg-[#D1D1D1]'
    : status === 'processing'
    ? 'bg-brand'
    : 'bg-[#FFC961]'} 
w-[52px] h-[52px] flex justify-center mr-3 rounded-l-[5px] drop-shadow-lg
`;

const NotificationBox = tw.div<ScheduleItemForm>`
${({ status }) =>
  status === 'terminated'
    ? 'bg-[#FFFFFF]'
    : status === 'processing'
    ? 'bg-brand'
    : 'bg-[#FFC961]'} 
w-[26px] h-[26px] flex justify-center m-auto mx-0 rounded-full border-[1px] ${({
  status,
}) =>
  status === 'terminated'
    ? 'border-[#D1D1D1]'
    : 'border-[#F8F8Fa]'} cursor-pointer drop-shadow-none
`;

export default React.memo(function ScheduleItem({
  auctionItem,
}: ScheduleItemForm) {
  const router = useRouter();

  let startDate: string = '';
  let endDate: string = '';

  if (auctionItem.status === 'terminated') {
    startDate = auctionItem?.startDate.format('M.D');
    endDate = auctionItem?.endDate.format('M.D');
  } else {
    startDate = auctionItem?.startDate.format('M월 D일 H시 m분');
    endDate = auctionItem?.endDate.format('M월 D일 H시 m분');
  }

  return (
    <div className="mt-5 flex justify-between ">
      <div className="flex">
        <ScheduleIconBox status={auctionItem.status}>
          <Image
            src="/svg/icons/icon_calendar.svg"
            alt="calendar"
            width={20}
            height={20}
          />
        </ScheduleIconBox>
        <div
          className="flex flex-col justify-center"
          onClick={() => {
            if (auctionItem.status === 'scheduled') {
              window.alert('경매가 시작하면 입장하실 수 있습니다.');
              return;
            }
            router.push({
              pathname: '/exhibition/view',
              query: { id: auctionItem?.turn },
            });
          }}
        >
          <span className="text-14 font-bold">
            제 {auctionItem?.turn}회 아띠즈 경매
          </span>
          <span className="text-10 font-semibold text-[#767676]">
            {startDate}~{endDate}
          </span>
        </div>
      </div>
      <NotificationBox status={auctionItem.status}>
        <Image
          src={`/svg/icons/icon_notification_${
            auctionItem.status === 'terminated' ? 'gray' : 'white'
          }.svg`}
          alt="notification"
          width={18}
          height={18}
        />
      </NotificationBox>
    </div>
  );
});
