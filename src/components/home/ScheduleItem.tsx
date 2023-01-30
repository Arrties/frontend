import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface ScheduleItemForm {
  time: number;
  start: string;
  end: string;
  [key: string]: any;
}

const ScheduleIconBox = tw.div<ScheduleItemForm>`
${({ time }) => (time === 1 ? 'bg-[#FC6554]' : 'bg-[#FFC961]')}
w-[52px] h-[52px] flex justify-center mr-3 rounded-l-[5px]
`;

const NotificationBox = tw.div<ScheduleItemForm>`
${({ time }) => (time === 1 ? 'bg-[#FC6554]' : 'bg-[#FFC961]')}
w-[26px] h-[26px] flex justify-center m-auto mx-0 rounded-full border-[1px] border-[#F8F8FA] cursor-pointer
`;

export default function ScheduleItem({ time, start, end }: ScheduleItemForm) {
  return (
    <div className="mt-5 flex justify-between ">
      <div className="flex drop-shadow-lg">
        <ScheduleIconBox time={time}>
          <Image
            src="/svg/icons/icon_calendar.svg"
            alt="calendar"
            width={20}
            height={20}
          />
        </ScheduleIconBox>
        <div className="flex flex-col justify-center">
          <span className="text-14 font-bold">제 {time}회 아띠즈 경매</span>
          <span className="text-10 font-semibold text-[#767676]">
            {start}~{end}
          </span>
        </div>
      </div>
      <NotificationBox time={time}>
        <Image
          src="/svg/icons/icon_notification_white.svg"
          alt="notification"
          width={18}
          height={0}
        />
      </NotificationBox>
    </div>
  );
}
