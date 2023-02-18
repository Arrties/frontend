import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

interface SellingItemProps {
  sellingItem: MyArtwork;
  [key: string]: any;
  handleOption?: (e) => void;
}

const SellingItemTag = tw.section<SellingItemProps>`
flex mt-6 border-b last:border-none border-[#EDEDED] pb-6 relative
`;

export default function SellingItem({
  sellingItem,
  handleOption,
  ...rest
}: SellingItemProps) {
  const router = useRouter();
  if (sellingItem.auctionStatus === 'registered')
    return (
      <SellingItemTag
        {...rest}
        onClick={() => {
          router.push(`/auction/view?id=${sellingItem?.id}`);
        }}
      >
        <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
          <Image
            alt="example"
            src={sellingItem?.image || '/svg/example/example_picture_col.svg'}
            fill
            className="object-cover"
          />
        </article>
        <article className="ml-3 pt-1">
          <p className="text-12 font-semibold text-[#767676]">
            제 {sellingItem?.turn}회 아띠즈 경매
          </p>
          <p className="mt-1 text-14">{sellingItem?.title}</p>
          <p className="mt-2 text-12">{sellingItem?.artistName}</p>
        </article>
        <Image
          alt="option"
          src="/svg/icons/icon_option_black.svg"
          width="18"
          height="18"
          className="absolute right-0 top-0 cursor-pointer"
          onClick={handleOption}
          id={sellingItem.id + ''}
        />
      </SellingItemTag>
    );

  if (sellingItem.auctionStatus === 'processing')
    return (
      <SellingItemTag {...rest}>
        <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
          <Image
            alt="example"
            src={sellingItem?.image || '/svg/example/example_picture_col.svg'}
            fill
            className="object-cover"
          />
        </article>
        <article className="ml-3 pt-1">
          <p className="text-12 font-semibold text-[#767676]">
            제 {sellingItem?.turn}회 아띠즈 경매
          </p>
          <p className="mt-1">
            <span className="text-14">{sellingItem?.title}</span>
            <span className="text-12"> | {sellingItem?.artistName}</span>
          </p>
          <div className="mt-[1.5px]">
            {sellingItem.biddingStatus === null ? (
              <p className="text-16 font-semibold text-brand">입찰 없음</p>
            ) : (
              <p className="text-16 font-semibold text-brand">
                입찰 현황 {sellingItem.biddingStatus}원
              </p>
            )}
          </div>
        </article>
      </SellingItemTag>
    );
  if (sellingItem.auctionStatus === 'sales_success')
    return (
      <SellingItemTag {...rest}>
        <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
          <Image
            alt="example"
            src={sellingItem?.image || '/svg/example/example_picture_col.svg'}
            fill
            className="object-cover"
          />
        </article>
        <article className="ml-3 pt-1">
          <p className="text-12 font-semibold text-[#767676]">
            제 {sellingItem?.turn}회 아띠즈 경매
          </p>
          <p className="mt-1">
            <span className="text-14">{sellingItem?.title}</span>
            <span className="text-12"> | {sellingItem?.artistName}</span>
          </p>
          <div className="mt-[1.5px]">
            {sellingItem.biddingStatus === null ? (
              <p className="text-16 font-semibold text-brand">입찰 없음</p>
            ) : (
              <p className="text-16 font-semibold text-brand">
                {sellingItem.biddingStatus}원 낙찰
              </p>
            )}
          </div>
        </article>
      </SellingItemTag>
    );

  if (sellingItem.auctionStatus === 'sales_failed')
    return (
      <SellingItemTag {...rest}>
        <article className="relative h-[100px] w-[82px] overflow-hidden rounded">
          <Image
            alt="example"
            src={sellingItem?.image || '/svg/example/example_picture_col.svg'}
            fill
            className="object-cover"
          />
        </article>
        <article className="ml-3 pt-1">
          <p className="text-12 font-semibold text-[#767676]">
            제 {sellingItem?.turn}회 아띠즈 경매
          </p>
          <p className="mt-1">
            <span className="text-14">{sellingItem?.title}</span>
            <span className="text-12"> | {sellingItem?.artistName}</span>
          </p>
          <div className="mt-[1.5px]">
            {sellingItem.biddingStatus === null ? (
              <p className="text-16 font-semibold text-brand">입찰 없음</p>
            ) : (
              <p className="text-16 font-semibold text-brand">
                입찰 현황 {sellingItem.biddingStatus}원
              </p>
            )}
          </div>
        </article>
      </SellingItemTag>
    );

  return <div></div>;
}
