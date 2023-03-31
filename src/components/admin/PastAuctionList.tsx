import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

interface PastAuctionListProps {
  [key: string]: any;
}

const PastAuctionListTag = tw.div<defaultProps>``;

export default function PastAuctionList({
  auctionList,
  pastAuctionList,
  ...rest
}: PastAuctionListProps) {
  const [auctionDateList, setAuctionDateList] =
    useState<
      { turn: number; startDate: moment.Moment; endDate: moment.Moment }[]
    >();
  useEffect(() => {
    if (!!auctionList || !!pastAuctionList) {
      setAuctionDateList(
        [...auctionList, ...pastAuctionList].map((it) => {
          return {
            turn: it.turn,
            startDate: it.startDate,
            endDate: it.endDate,
          };
        }),
      );
    }
  }, [auctionList, pastAuctionList]);
  return (
    <PastAuctionListTag {...rest}>
      <section className="mt-5 text-center">
        <p className="text-18 font-bold">지난 경매 리스트</p>
        <table>
          <tbody>
            <tr>
              <th className="w-[3.125rem]">회차</th>
              <th className="w-[11.875rem] ">시작일</th>
              <th className="w-[11.875rem]">종료일</th>
            </tr>
            {!!auctionDateList &&
              auctionDateList.map((it, idx) => (
                <tr key={idx}>
                  <td>{it.turn}</td>
                  <td>{it.startDate.format('MM/DD H시m분')}</td>
                  <td>{it.endDate.format('MM/DD H시m분')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </PastAuctionListTag>
  );
}
