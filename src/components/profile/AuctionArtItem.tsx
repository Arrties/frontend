import Image from 'next/image'
import React from 'react'
import tw from 'tailwind-styled-components'

interface AuctionArtItemProps {
  [key: string]: any;
  lastChild?: React.ReactNode;
  handleOption?: () => void;
}

const AuctionArtItemTag = tw.section<AuctionArtItemProps>`
flex mt-5 border-b last:border-none border-[#EDEDED] pb-5 relative
`;

export default function AuctionArtItem({
  lastChild,
  handleOption,
  ...rest
}: AuctionArtItemProps) {
  return (
    <AuctionArtItemTag {...rest}>
      <article className="rounded overflow-hidden">
        <Image
          alt="example"
          src="/svg/example/example_picture_col.svg"
          width="70"
          height="0"
        />
      </article>
      <article className="ml-3">
        <p className="text-12 text-[#767676] font-bold">제 1회 아띠즈 경매</p>
        <p className="font-bold text-16">콰야 녹아내리는 고드름</p>
        <p className="text-14"> 아라</p>
        {lastChild}
      </article>

      <Image
        alt=""
        src="/svg/icons/icon_option_black.svg"
        width="18"
        height="0"
        className="absolute right-0 top-0 cursor-pointer"
        onClick={handleOption}
      />
    </AuctionArtItemTag>
  );
}
