import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';

interface SellingArtItemProps {
  biddingItem: MyArtwork;
  auctionStatus: 'registered' | 'processing' | 'sales_success' | 'sales_failed';
  [key: string]: any;
  handleOption?: () => void;
}

const SellingArtItemTag = tw.section<SellingArtItemProps>`
flex mt-6 border-b last:border-none border-[#EDEDED] pb-6 relative
`;

export default function SellingArtItem({
  biddingItem,
  handleOption,
  auctionStatus,
  ...rest
}: SellingArtItemProps) {
  if (auctionStatus === 'registered')
    return (
      <SellingArtItemTag {...rest}>
        <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
          <Image
            alt="example"
            src={biddingItem?.image || '/svg/example/example_picture_col.svg'}
            fill
            className="object-cover"
          />
        </article>
        <article className="ml-3 pt-1">
          <p className="text-12 font-semibold text-[#767676]">
            제 {biddingItem?.turn}회 아띠즈 경매
          </p>
          <p className="mt-1 text-14">{biddingItem?.title}</p>
          <p className="mt-2 text-12">{biddingItem?.artistName}</p>
        </article>
        <Image
          alt="option"
          src="/svg/icons/icon_option_black.svg"
          width="18"
          height="18"
          className="absolute right-0 top-0 cursor-pointer"
          onClick={handleOption}
        />
      </SellingArtItemTag>
    );

  if (auctionStatus === 'processing')
    return (
      <SellingArtItemTag {...rest}>
        <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
          <Image
            alt="example"
            src={biddingItem?.image || '/svg/example/example_picture_col.svg'}
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
              {biddingItem?.biddingStatus}원
            </p>
          </div>
        </article>
      </SellingArtItemTag>
    );

  return <div></div>;
}
