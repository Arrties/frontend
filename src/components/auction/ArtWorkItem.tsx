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
        <Image
          alt=""
          src="/svg/example/detail.svg"
          width="0"
          height="0"
          className="w-full rounded-xl "
        />
      </section>
      <section className="absolute inset-x-0 bottom-0 m-auto rounded-b-xl bg-white px-3 py-4">
        <article className="text-16 font-medium">
          콰야 녹아내리는 고드름
        </article>
        <article className="my-1 flex gap-2 text-14 text-[#767676]">
          <span>Oil On Canvas</span>|<span>72.2x61.0cm (20) </span>|
          <span>2021</span>
        </article>
        <article className="flex items-center gap-2">
          <span className="text-18 font-bold">2,800,000원</span>
          <span className="text-14">현재가</span>
        </article>
      </section>
    </ArtWorkItemTag>
  );
}
