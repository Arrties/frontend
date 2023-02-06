import moment from 'moment';
import { useState } from 'react';

import useInterval from './useInterval';

const convertDate = (countDown): string[] => {
  const diff = moment.duration(countDown);
  const days = String(diff.days());
  const hours = String(diff.hours()).padStart(2, '0');
  const minutes = String(diff.minutes()).padStart(2, '0');
  const seconds = String(diff.seconds()).padStart(2, '0');
  return [days, hours, minutes, seconds];
};

export const useCountDown = (targetDate: string) => {
  const currentDate = moment().unix() * 1000;
  const endDate = moment(targetDate, 'YYYY-MM-DD-HH-mm-ss').unix() * 1000;
  const [countdown, setCountdown] = useState<any>(endDate - currentDate);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  useInterval(
    () => {
      const currentTime = moment().unix() * 1000;
      const endDate = moment(targetDate, 'YYYY-MM-DD-HH-mm-ss').unix() * 1000;
      if (endDate - currentDate <= 0) {
        return;
      }
      setCountdown(endDate - currentTime);
      if (endDate - currentTime === 0) {
        setIsEnd(true);
      }
    },
    isEnd ? null : 1000,
  );

  return convertDate(countdown);
};
