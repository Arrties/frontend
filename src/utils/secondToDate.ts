export const secondToDate = (secondSum: number) => {
  const day = Math.floor(secondSum / (60 * 60 * 24));
  const hour = Math.floor((secondSum % (60 * 60 * 24)) / (60 * 60));
  const minute = Math.floor((secondSum % (60 * 60)) / 60);
  const second = Math.floor(secondSum % 60);
  return { day, hour, minute, second };
};
