import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

interface AuctionItemForm {
  auctionItem: AuctionList;
  [key: string]: any;
}

export default function AuctionItem({ auctionItem, ...rest }: AuctionItemForm) {
  console.log(auctionItem);

  const router = useRouter();

  return (
    <div
      className="mb-5 flex last:mb-0"
      {...rest}
      onClick={() => {
        router.push(`/auction/${auctionItem?.id}`);
      }}
    >
      <div className="relative mr-2 h-[90px] w-[82px] rounded">
        <Image
          src={auctionItem?.image || ''}
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
        <span className="text-11 text-[#767676]">{auctionItem?.endDate}</span>
        <span className="text-16 font-semibold text-[#191919]">
          제 {auctionItem?.turn}회 아띠즈 경매
        </span>
        <span className="text-12 text-[#767676]">
          작품 등록 : {auctionItem?.artWorkCount}
        </span>
        <span className="text-12 text-[#767676]">
          경매 등록 : {auctionItem?.artWorkCount}
        </span>
      </div>
    </div>
  );
}
