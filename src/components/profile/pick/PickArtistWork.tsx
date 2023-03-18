import Image from 'next/image';
interface PickArtistWorkProps {
  title: string;
  saleStatus: string;
  image: string;
  [key: string]: any;
}

export default function PickArtistWork({
  title,
  saleStatus,
  image,
  ...rest
}: PickArtistWorkProps) {
  return (
    <div className="flex cursor-pointer items-center" {...rest}>
      <Image
        alt="artwork"
        src={image || '/svg/icons/.svg'}
        width="100"
        height="0"
        className="aspect-square w-[82px] rounded"
      />

      <div className="ml-5">
        <p className="mb-[6px] text-14 font-medium">{title} </p>
        <div
          className={`flex h-[17px] w-[52px] items-center justify-center text-[10px] text-white
          ${saleStatus === '입찰중' ? 'bg-[#4B9E77]' : 'bg-[#191919]'}`}
        >
          {saleStatus}
        </div>
      </div>
    </div>
  );
}
