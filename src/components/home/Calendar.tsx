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
                .startOf('isoWeek')
                .add(data + index, 'day');
              if (current.format('MM') !== today.format('MM')) {
                return (
                  <td className="" key={index}>
                    <span></span>
                  </td>
                );
              } else if (
                DUMP_AUCTION_DATE_LISTS.find(
                  (x) => x === current.format('YYYYMMDD'),
                )
              ) {
                return (
                  <td
                    className="p-2 bg-[#FFC961] text-[#FFFFFF] text-14 font-bold"
                    key={index}
                  >
                    <span>{current.format('D')}</span>
                  </td>
                );
              } else if (
                moment().format('YYYYMMDD') === current.format('YYYYMMDD')
              ) {
                return (
                  <td
                    className="p-2 text-[#FC6554] text-14 font-bold"
                    key={index}
                  >
                    <span>{current.format('D')}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    className="p-2 text-[#767676] text-14 font-bold"
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
      <div className="mt-3 h-[50px] bg-[#F8F8FA] flex justify-evenly m-auto items-center">
        <button onClick={() => setDate(date.clone().subtract(1, 'month'))}>
          <Image
            src="/svg/icons/icon_back.svg"
            alt="back"
            width={7}
            height={0}
          />
        </button>
        <span className="text-15 text-[#333333] font-bold">
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
      <table className="w-full text-center mt-3">
        <tbody>
          <tr className="text-[#FC6554] text-14 font-semibold">
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
