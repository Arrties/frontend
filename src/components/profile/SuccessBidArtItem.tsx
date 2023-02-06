import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';

interface SuccessBidArtItemProps {
  biddingItem: SuccessfulBidArtworkForm;
  [key: string]: any;
  handleOption?: () => void;
}

const SuccessBidArtItemTag = tw.section<SuccessBidArtItemProps>`
flex mt-6 border-b last:border-none border-[#EDEDED] pb-6 relative
`;

export default function SuccessBidArtItem({
  biddingItem,
  handleOption,
  ...rest
}: SuccessBidArtItemProps) {
  return (
    <SuccessBidArtItemTag {...rest}>
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
        <p className="mt-1">
          <span className="text-14">{biddingItem?.title}</span>
          <span className="text-12"> | {biddingItem?.artistName}</span>
        </p>
        <div className="mt-[1.5px]">
          <p className="text-16 font-semibold text-brand">
            {biddingItem?.finalBiddingPrice}원
          </p>
        </div>
      </article>
    </SuccessBidArtItemTag>
  );
}
