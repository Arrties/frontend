import Image from 'next/image';
import { useRouter } from 'next/router';

interface AuctionItemForm {
  src: string;
  date: string;
  artRegister: number;
  status: boolean;
  id: number;
}

interface AuctionListProps {
  auctionList: AuctionItemForm;
}

export default function AuctionItem({ auctionList }: AuctionListProps) {
  const router = useRouter();
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
        <Image
          src={auctionList.src}
          alt="notification"
          fill
          style={{
            objectFit: 'cover',
          }}
          className="rounded"
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center">
        {auctionList.status ? (
          <span className="h-[17px] w-[42px] bg-[#FC6554] text-center text-10 text-[#FFFFFF]">
            D-7
          </span>
        ) : (
          <span className="h-[17px] w-[42px] bg-[#191919] text-center text-10 text-[#FFFFFF]">
            종료
          </span>
        )}
        <span className="text-16 font-semibold text-[#191919]">
          제 {auctionList.id}회 아띠즈 경매
        </span>
        <span className="text-14 text-[#767676]">
          작품 수 : {auctionList.artRegister}
        </span>
        <span className="text-11 text-[#767676]">{auctionList.date}</span>
      </div>
    </div>
  );
}
