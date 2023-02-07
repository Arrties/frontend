export const makeThreeEach = (auctionList: AuctionList[]) => {
  const newArr: AuctionList[][] = [];
  let arr: AuctionList[] = [];
  auctionList.forEach((it: any, idx: number) => {
    arr.push(it);
    if (arr.length === 3) {
      newArr.push(arr);
      arr = [];
    }
    if (idx === auctionList.length - 1) {
      newArr.push(arr);
    }
  });
  return newArr;
};
