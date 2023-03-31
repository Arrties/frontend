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
        className="aspect-square w-[5.125rem] rounded"
      />

      <div className="ml-5">
        <p className="mb-[0.375rem] text-14 font-medium">{title} </p>
        <div
          className={`flex h-[1.0625rem] w-[3.25rem] items-center justify-center text-[0.625rem] text-white
          ${saleStatus === '입찰중' ? 'bg-[#4B9E77]' : 'bg-[#191919]'}`}
        >
          {saleStatus}
        </div>
      </div>
    </div>
  );
}
