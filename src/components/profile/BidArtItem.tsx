import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';

interface ArtItemProps {
  biddingItem: BidArtworkForm;
  [key: string]: any;
  lastChild?: React.ReactNode;
  handleOption?: () => void;
}

const ArtItemTag = tw.section<ArtItemProps>`
flex mt-5 border-b last:border-none border-[#EDEDED] pb-5 relative
`;

export default function BidArtItem({
  biddingItem,
  lastChild,
  handleOption,
  ...rest
}: ArtItemProps) {
  const router = useRouter();
  return (
    <ArtItemTag
      {...rest}
      onClick={() => {
        router.push(`/auction/${biddingItem?.id}`);
      }}
    >
      <article className="overflow-hidden rounded">
        <Image
          alt="example"
          src={biddingItem?.mainImage || '/svg/example/example_picture_col.svg'}
          width="70"
          height="0"
        />
      </article>
      <article className="ml-3">
        <p className="text-12  text-[#767676]">
          제 {biddingItem?.turn}회 아띠즈 경매
        </p>
        <p className="text-16 ">
          {biddingItem?.title} | {biddingItem?.artistName}
        </p>
        <p className="ml-1 text-14 ">
          나의 입찰가 {biddingItem?.myBiddingPrice}원
        </p>
        <p className="ml-1 text-14 font-bold ">
          최종 입찰가 {biddingItem?.finalBiddingPrice}원
        </p>
      </article>
    </ArtItemTag>
  );
}
