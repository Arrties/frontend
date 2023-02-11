import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface ScheduleItemForm {
  auctionItem: AuctionList;
  [key: string]: any;
}

const ScheduleIconBox = tw.div<ScheduleItemForm>`
${({ status }) =>
  status === 'done'
    ? 'bg-[#D1D1D1]'
    : status === 'proceeding'
    ? 'bg-brand'
    : 'bg-[#FFC961]'} 
w-[52px] h-[52px] flex justify-center mr-3 rounded-l-[5px] drop-shadow-lg
`;

const NotificationBox = tw.div<ScheduleItemForm>`
 ${({ status }) =>
   status === 'done'
     ? 'bg-[#FFFFFF]'
     : status === 'proceeding'
     ? 'bg-brand'
     : 'bg-[#FFC961]'} 
w-[26px] h-[26px] flex justify-center m-auto mx-0 rounded-full border-[1px] ${({
  status,
}) =>
  status === 'done'
    ? 'border-[#D1D1D1]'
    : 'border-[#F8F8Fa]'} cursor-pointer drop-shadow-none
`;

export default function ScheduleItem({ auctionItem }: ScheduleItemForm) {
  const router = useRouter();
  const [status, setStatus] = useState<String>('');
  const startDate: string = auctionItem?.startDate.format('YYYY.MM.DD');
  const endDate: string = auctionItem?.endDate.format('YYYY.MM.DD');

  useEffect(() => {
    if (moment().isAfter(auctionItem?.endDate)) {
      setStatus('done');
    } else if (moment().isAfter(auctionItem?.startDate)) {
      setStatus('proceeding');
    } else {
      setStatus('expected');
    }
  });

  return (
    <div className="mt-5 flex justify-between ">
      <div className="flex">
        <ScheduleIconBox status={status}>
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
      <NotificationBox status={status}>
        <Image
          src={`/svg/icons/icon_notification_${
            status === 'done' ? 'gray' : 'white'
          }.svg`}
          alt="notification"
          width={18}
          height={18}
        />
      </NotificationBox>
    </div>
  );
}
