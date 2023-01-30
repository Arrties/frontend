import Image from 'next/image';

interface AuctionItemForm {
  key?: string;
  src: string;
  date: string;
  artRegister: number;
  auctionRegister: number;
  id: number;
  [key: string]: any;
}

export default function AuctionItem({
  src,
  date,
  artRegister,
  auctionRegister,
  id,
  ...rest
}: AuctionItemForm) {
  return (
    <div className="mb-5 flex last:mb-0" {...rest}>
      <div className="relative mr-2 h-[90px] w-[82px] rounded">
        <Image
          src={src}
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
        <span className="text-11 text-[#767676]">{date}</span>
        <span className="text-16 font-semibold text-[#191919]">
          제 {id}회 아띠즈 경매
        </span>
        <span className="text-12 text-[#767676]">
          작품 등록 : {artRegister}
        </span>
        <span className="text-12 text-[#767676]">
          경매 등록 : {auctionRegister}
        </span>
      </div>
    </div>
  );
}
