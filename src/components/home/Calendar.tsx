import moment from 'moment';
import Image from 'next/image';
import { ReactElement, useState } from 'react';

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DUMP_AUCTION_DATE_LISTS = [
  '20230213',
  '20230214',
  '20230215',
  '20230216',
  '20230217',
  '20230218',
  '20230219',
  '20230227',
  '20230228',
];
export default function Calendar() {
  const [date, setDate] = useState<moment.Moment>(() => moment());
  const today = date;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  const calendarArr = () => {
    const calendar: ReactElement[] = [];
    for (let week = firstWeek - 1; week <= lastWeek; week++) {
      calendar.push(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              const current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(data + index + 1, 'day');
              if (current.format('MM') !== today.format('MM')) {
                return (
                  <td className="" key={index}>
                    <span></span>
                  </td>
                );
              } else if (
                moment().format('YYYYMMDD') === current.format('YYYYMMDD')
              ) {
                return (
                  <td
                    className="p-2 text-14 font-bold text-[#FC6554]"
                    key={index}
                  >
                    <span>{current.format('D')}</span>
                  </td>
                );
              } else if (
                DUMP_AUCTION_DATE_LISTS.find(
                  (x) => x === current.format('YYYYMMDD'),
                )
              ) {
                return (
                  <td
                    className="bg-[#FFC961] p-2 text-14 font-bold text-[#FFFFFF]"
                    key={index}
                  >
                    <span>{current.format('D')}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    className="p-2 text-14 font-bold text-[#767676]"
                    key={index}
                  >
                    <span>{current.format('D')}</span>
                  </td>
                );
              }
            })}
        </tr>,
      );
    }
    return calendar;
  };

  return (
    <>
      <div className="m-auto mt-3 flex h-[50px] items-center justify-evenly bg-[#F8F8FA]">
        <button onClick={() => setDate(date.clone().subtract(1, 'month'))}>
          <Image
            src="/svg/icons/icon_back.svg"
            alt="back"
            width={7}
            height={0}
          />
        </button>
        <span className="text-15 font-bold text-[#333333]">
          {date.format('MMMM YYYY')}
        </span>
        <button onClick={() => setDate(date.clone().add(1, 'month'))}>
          <Image
            src="/svg/icons/icon_next.svg"
            alt="arrow"
            width={8}
            height={0}
          />
        </button>
      </div>
      <table className="mt-3 w-full text-center">
        <tbody>
          <tr className="text-14 font-semibold text-[#FC6554]">
            {days.map((day, idx) => (
              <td key={idx}>{day}</td>
            ))}
          </tr>
          {calendarArr()}
        </tbody>
      </table>
    </>
  );
}
