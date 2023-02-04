import Image from 'next/image';
import { useRouter } from 'next/router';

interface ExhibitionItemForm {
  src: string;
  education: string;
  title: string;
  id: string;
}

export default function ExhibitionItem({
  src,
  education,
  title,
  id,
}: ExhibitionItemForm) {
  const router = useRouter();
  return (
    <div
      className="relative h-[197px] w-[158px] rounded"
      onClick={() => {
        router.push(`/exhibition/${id}`);
      }}
    >
      <Image
        src={src}
        alt="notification"
        fill
        sizes="1000"
        style={{
          objectFit: 'cover',
        }}
        priority
        className="rounded"
        quality={100}
      />

      <div className="h-full w-full rounded bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.5)]">
        <div className="absolute bottom-1 left-2 flex flex-col text-[#FFFFFF]">
          <div className="text-12">{education}</div>
          <div className="text-14 font-bold">{title}</div>
        </div>
      </div>
      <Image
        src="/svg/icons/icon_heart_filled.svg"
        alt="heart"
        width={30}
        height={30}
        className="absolute right-3 top-3"
      />
    </div>
  );
}
