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
          width="82"
          height="99"
        />
      </article>
      <article className="ml-3 py-2">
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
    </ArtItemTag>
  );
}
