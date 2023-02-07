import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';

interface BidItemProps {
  biddingItem: BidArtwork;
  [key: string]: any;
  handleOption?: () => void;
}

const BidItemTag = tw.section<BidItemProps>`
flex mt-6 border-b last:border-none border-[#EDEDED] pb-6 relative
`;

export default function BidItem({
  biddingItem,
  handleOption,
  ...rest
}: BidItemProps) {
  const router = useRouter();
  return (
    <BidItemTag
      {...rest}
      onClick={() => {
        router.push(`/auction/${biddingItem?.id}`);
      }}
    >
      <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
        <Image
          alt="example"
          src={biddingItem?.mainImage || '/svg/example/example_picture_col.svg'}
          fill
          className="object-cover"
        />
      </article>
      <article className="ml-3 pt-1">
        <p className="text-12 font-semibold text-[#767676]">
          제 {biddingItem?.turn}회 아띠즈 경매
        </p>
        <p>
          <span className="text-14">{biddingItem?.title}</span>
          <span className="text-12"> | {biddingItem?.artistName}</span>
        </p>
        <div className="mt-2">
          <p className="text-12 font-semibold text-[#767676]">
            나의 입찰가 {biddingItem?.myBiddingPrice}원
          </p>
          <p className="font-semibold">
            <span className="text-12">최종 입찰가</span>
            <span className="text-14"> {biddingItem?.finalBiddingPrice}원</span>
          </p>
        </div>
      </article>
    </BidItemTag>
  );
}
