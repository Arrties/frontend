import Image from 'next/image';
import styled from 'styled-components';

const LayoutBox = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Detail() {
  return (
    <LayoutBox className="relative h-full w-full max-w-[420px] overflow-y-scroll bg-white">
      <div
        className="absolute inset-x-0
         h-[306px] w-full bg-slate-500"
      >
        <div className="flex h-16 w-full items-center justify-between px-6">
          <Image
            alt="clock"
            src="/svg/icons/auction/icon_arrow_white.svg"
            width="24"
            height="24"
          />
          <Image
            alt="clock"
            src="/svg/icons/auction/icon_heart_white.svg"
            width="24"
            height="24"
          />
        </div>
      </div>
    </LayoutBox>
  );
}
