import moment from 'moment';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function Calendar({ auctionList, pastAuctionList }) {
  const [date, setDate] = useState<moment.Moment>(() => moment());
  const [auctionDateList, setAuctionDateList] = useState();
  const today = date;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  useEffect(() => {
    if (!!auctionList || !!pastAuctionList) {
      setAuctionDateList(
        [...auctionList, ...pastAuctionList].map((it) => {
          return { startDate: it.startDate, endDate: it.endDate };
        }),
      );
    }
  }, [auctionList, pastAuctionList]);

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
                return <td key={index}></td>;
              }
              const isToday = moment().isSame(current, 'days');

              let status = 'notAuctionDate';
              if (!auctionDateList) return;
              for (const it of auctionDateList) {
                if (
                  current.isSameOrAfter(it.startDate, 'days') &&
                  current.isSameOrBefore(it.endDate, 'days')
                ) {
                  if (moment().isAfter(it.endDate, 'days')) {
                    status = 'done';
                  } else if (moment().isBefore(it.startDate, 'days')) {
                    status = 'expected';
                  } else {
                    status = 'proceeding';
                  }
                  break;
                }
              }
              return (
                <td
                  key={index}
                  className={`
                p-2 text-14 font-bold text-${
                  isToday && status !== 'proceeding' && '[#FC6554]'
                } text-${
                    status === 'notAuctionDate' ? '[#767676]' : '[#FFFFFF]'
                  }                   
                  bg-${
                    status === 'proceeding'
                      ? 'brand'
                      : status === 'done'
                      ? '[#D1D1D1]'
                      : status === 'expected'
                      ? '[#FFC961]'
                      : ''
                  } 
                `}
                >
                  <span>{current.format('D')}</span>
                </td>
              );
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
            height={7}
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
            height={8}
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
