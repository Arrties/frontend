import Image from 'next/image';
import { useState, useEffect } from 'react';

export interface TimerProps {
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export default function Timer({ day, hour, minute, second }: TimerProps) {
  const [days, setDays] = useState(day);
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);
  const [timer, setTimer] = useState('');

  if (day >= 1) setTimer(`D-${day}`);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            if (days === 0) {
              clearInterval(interval);
            } else {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    setTimer(
      `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`,
    );
    return () => clearInterval(interval);
  }, [days, hours, minutes, seconds]);

  return (
    <div className=" flex items-center rounded border border-brand px-2">
      <Image
        alt=""
        src="/svg/icons/icon_clock_brand.svg"
        width="14"
        height="0"
        className="mr-1"
      />
      <span className="text-[14px] font-bold">{timer}</span>
    </div>
  );
}
