import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface AuctionListProps {
  auctionList: ExhibitionList;
}

export default function AuctionItem({ auctionList }: AuctionListProps) {
  const router = useRouter();

  const remainedDay = () => {
    const currentDate = moment().unix() * 1000;
    const endDate = moment(auctionList.endDate, 'YYYY-MM-DD').unix() * 1000;
    const diff = moment.duration(endDate - currentDate);
    return diff.days();
  };

  return (
    <div
      className="mb-5 flex cursor-pointer border-b-[1px] pb-6 last:mb-0"
      onClick={() =>
        router.push({
          pathname: '/exhibition/view',
          query: { id: auctionList.id },
        })
      }
    >
      <div className="relative mr-2 h-[99px] w-[82px] rounded">
        {auctionList.image && (
          <Image
            src={auctionList.image}
            alt="notification"
            fill
            className="rounded object-cover"
            quality={100}
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        {auctionList.status === 'processing' ? (
          <span className="h-[17px] w-[42px] bg-[#FC6554] text-center text-10 text-[#FFFFFF]">
            D-{remainedDay()}
          </span>
        ) : (
          <span className="h-[17px] w-[42px] bg-[#191919] text-center text-10 text-[#FFFFFF]">
            종료
          </span>
        )}
        <span className="text-16 font-semibold text-[#191919]">
          제 {auctionList.turn}회 아띠즈 경매
        </span>
        <span className="text-14 text-[#767676]">
          작품 수 : {auctionList.artWorkCount}
        </span>
        <span className="text-11 text-[#767676]">
          {auctionList.startDate}~{auctionList.endDate}
        </span>
      </div>
    </div>
  );
}
