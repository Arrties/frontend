import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

interface ScheduleItemForm {
  auctionItem: AuctionList;
  [key: string]: any;
}

const ScheduleIconBox = tw.div<ScheduleItemForm>`
${({ turn }) => (turn === 1 ? 'bg-[#FC6554]' : 'bg-[#FFC961]')}
w-[52px] h-[52px] flex justify-center mr-3 rounded-l-[5px] drop-shadow-lg
`;

const NotificationBox = tw.div<ScheduleItemForm>`
${({ turn }) => (turn === 1 ? 'bg-[#FC6554]' : 'bg-[#FFC961]')}
w-[26px] h-[26px] flex justify-center m-auto mx-0 rounded-full border-[1px] border-[#F8F8FA] cursor-pointer drop-shadow-none
`;

export default function ScheduleItem({ auctionItem }: ScheduleItemForm) {
  const startDate: string = auctionItem?.startDate.format('YYYY.MM.DD');
  const endDate: string = auctionItem?.endDate.format('YYYY.MM.DD');

  const router = useRouter();

  return (
    <div className="mt-5 flex justify-between ">
      <div className="flex">
        <ScheduleIconBox turn={auctionItem?.turn}>
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
      <NotificationBox turn={auctionItem?.turn}>
        <Image
          src="/svg/icons/icon_notification_white.svg"
          alt="notification"
          width={18}
          height={18}
        />
      </NotificationBox>
    </div>
  );
}
