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
    <div className="flex mb-5 last:mb-0" {...rest}>
      <div className="w-[82px] h-[90px] rounded mr-2 relative">
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
      <div className="flex flex-col">
        <span className="text-11 text-[#767676]">{date}</span>
        <span className="text-16 text-[#191919] font-semibold">
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
