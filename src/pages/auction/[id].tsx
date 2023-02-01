import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const LayoutBox = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Detail() {
  const target = useRef<HTMLDivElement | null>(null);
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('intersecting!!!');
      }
    });
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        rootMargin: `0px 0px -${window.innerHeight - 64}px 0px`,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <LayoutBox className="relative h-full w-full max-w-[420px] overflow-y-scroll scroll-smooth border border-red-500 bg-white">
      <div className="fixed inset-x-0 top-0 mx-auto flex h-16 w-full max-w-[420px] items-center justify-between px-6">
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
      <div className="h-[306px] w-full bg-slate-500"></div>
      <div
        ref={target}
        className="-mt-4 h-[2000px] w-full rounded-t-2xl bg-blue-500"
      ></div>
    </LayoutBox>
  );
}
