import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface ArtWorkItemProps {
  [key: string]: any;
}
interface defaultProps {
  [key: string]: any;
}
const ArtWorkItemTag = tw.div<defaultProps>`
w-full h-[264px] bg-[#FFFFFF] rounded-xl relative shadow-lg shadow-slate-100 mb-5
`;
export default function ArtWorkItem({ ...rest }: ArtWorkItemProps) {
  return (
    <ArtWorkItemTag {...rest}>
      <section className="h-[200px] overflow-hidden">
        <article className="absolute left-2.5 top-2.5 flex gap-1 rounded-[8px] bg-[#FFC961] px-2 py-0.5 text-12 text-white ">
          <Image alt="" src="/svg/icons/icon_clock.svg" width="10" height="0" />
          <span className="">D-4</span>
        </article>
        <Image
          alt=""
          src="/svg/example/detail.svg"
          width="0"
          height="0"
          className="w-full rounded-xl "
        />
      </section>
      <section className="absolute inset-x-0 bottom-0 m-auto rounded-b-xl bg-white p-2">
        <article className="text-14 font-semibold">
          콰야 녹아내리는 고드름
        </article>
        <article className="my-1 flex gap-2 text-10 text-[#767676]">
          <span>Oil On Canvas</span>|<span>72.2x61.0cm (20) </span>|
          <span>2021</span>
        </article>
        <article className="flex items-center gap-2">
          <span className="text-16 font-bold ">2,800,000원</span>
          <span className="text-10">최고 낙찰가</span>
        </article>
        <article className="absolute right-2 bottom-3 flex gap-1 text-10">
          <Image alt="" src="/svg/icons/icon_heart.svg" width="12" height="0" />
          67
        </article>
      </section>
    </ArtWorkItemTag>
  );
}
