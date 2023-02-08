import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

interface AuctionItemForm {
  auctionItem: AuctionList;
  [key: string]: any;
}

export default function AuctionItem({ auctionItem, ...rest }: AuctionItemForm) {
  const router = useRouter();
  const startDate = auctionItem?.startDate.format('MM.DD');
  const endDate = auctionItem?.endDate.format('MM.DD');
  return (
    <div className="mb-5 flex last:mb-0" {...rest}>
      <div className="relative mr-2 h-[90px] w-[82px] rounded">
        <Image
          src={auctionItem?.image || '/svg/icons/icon_logo_main.svg'}
          alt="notification"
          fill
          className="rounded"
          quality={100}
        />
      </div>
      <div
        className="flex flex-col justify-center"
        onClick={() => {
          if (auctionItem?.artWorkCount === 0) {
            alert('등록된 작품이 없습니다.');
            return;
          }
          router.push({
            pathname: '/exhibition/view',
            query: { id: auctionItem?.turn },
          });
        }}
      >
        <span className="text-11 text-[#767676]">
          {startDate}~{endDate}
        </span>
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
