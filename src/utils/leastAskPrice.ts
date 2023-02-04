export const leatAskPrice = (currenPrice: number): number => {
  if (currenPrice < 300000) return currenPrice + 20000;
  if (currenPrice < 1000000) return currenPrice + 50000;
  if (currenPrice < 3000000) return currenPrice + 100000;
  if (currenPrice < 5000000) return currenPrice + 200000;
  if (currenPrice < 10000000) return currenPrice + 500000;
  else return currenPrice + 1000000;
};
