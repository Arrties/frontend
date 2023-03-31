import { today } from '@utils/today';
import Image from 'next/image';

interface GuaranteeProps {
  mainImage: string;
  nickname: string;
  title: string;
  productionYear: number;
  width: number;
  length: number;
  height: number;
  genre: string;
  guaranteeImage: string;
}

export default function Guarantee({
  mainImage,
  nickname,
  title,
  productionYear,
  width,
  length,
  height,
  genre,
  guaranteeImage,
}: GuaranteeProps) {
  return (
    <article className="relative h-[28.5625rem] w-full">
      <div className="m-auto  min-w-[20.4375rem] flex-col items-center justify-center py-9">
        <div className="text-center text-16 font-semibold tracking-[0.3em]">
          작 품 보 증 서
        </div>
        <p className="text-center text-[0.5rem] font-light tracking-[-0.05em] text-[#A5A5A5]">
          CERTIFICATE OF AUTHENTICITY
        </p>
        <div className="relative mx-auto mt-7 h-[4.625rem] w-[7.25rem]">
          <Image src={mainImage} fill className="object-cover" alt="artwork" />
        </div>
        <div className="mt-3 flex justify-center text-11 leading-5">
          <div className="flex-col font-semibold">
            <p>작가</p>
            <p>제목</p>
            <p>제작년도</p>
            <p>작품크기</p>
            <p>제작기법</p>
          </div>
          <div className="ml-12 flex-col">
            <p>{nickname}</p>
            <p>{title}</p>
            <p>{productionYear}</p>
            <p>
              {width}x${length}
              x${height}cm
            </p>
            <p>{genre}</p>
          </div>
        </div>
        <div className="mt-4 flex-col">
          <div className="flex items-center justify-center">
            <Image src={guaranteeImage} width={50} height={50} alt="artwork" />
          </div>
          <div className="mt-2 flex-col items-center justify-center">
            <div className="mx-auto w-[4.375rem] border-t border-t-black pb-[0.1875rem]" />
            <div className="text-center text-[0.5rem]  text-[#A5A5A5]">
              Artist Signature
            </div>
          </div>
        </div>
        <ul className="mt-3 w-full list-none text-center text-[0.5rem]">
          <li className="w-full  text-black  before:mr-2  before:content-['\2022']">
            본 작품은 위에 서명한 작가의 작품임을 보증합니다.
          </li>
          <li className="w-full text-black  before:mr-2  before:content-['\2022']">
            본 작품은 일체의 모작, 위작이 아님을 보증합니다.
          </li>
          <li className="w-full text-black  before:mr-2  before:content-['\2022']">
            본 보증서는 작품 보증 이외 환불, 교환 등의 목적으로 사용이
            불가합니다.
          </li>
        </ul>
        <p className="my-3 text-center text-[0.5rem]">{today()}</p>
        <div className="flex items-center justify-center text-brand">
          <Image
            src="/svg/post/logo_small.svg"
            width={60}
            height={10}
            alt="logo"
          />
        </div>
      </div>
    </article>
  );
}
