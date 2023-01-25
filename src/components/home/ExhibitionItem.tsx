import Image from 'next/image';

interface ExhibitionItemForm {
  src: string;
  school: string;
  name: string;
}

export default function ExhibitionItem({
  src,
  school,
  name,
}: ExhibitionItemForm) {
  console.log(name, school);
  return (
    <div className="relative h-[197px] w-[158px] rounded">
      <Image
        src={src}
        alt="notification"
        fill
        style={{
          objectFit: 'cover',
        }}
        className="rounded"
        quality={100}
      />

      <div className="h-full w-full rounded bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.5)]">
        <div className="absolute bottom-1 left-2 flex flex-col text-[#FFFFFF]">
          <div className="text-12">{school}</div>
          <div className="text-14 font-bold">{name}</div>
        </div>
      </div>
      <Image
        src="/svg/icons/icon_heart_filled.svg"
        alt="heart"
        width={30}
        height={0}
        className="absolute right-3 top-3"
      />
    </div>
  );
}
