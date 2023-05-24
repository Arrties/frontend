import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

interface TabItemProps {
  tabItem: {
    id: number;
    name: string;
    word: string;
  };
}

export default function TabItem({ tabItem }: TabItemProps) {
  const router = useRouter();
  const handleTabItem = (name: string) => {
    router.push(`/${name}`);
  };

  const [isHovering, setIsHovering] = useState<string>('');

  const handleMouseEnter = (name) => {
    setIsHovering(name);
  };

  const handleMouseLeave = () => {
    setIsHovering('');
  };

  return (
    <Link
      href={`/${tabItem.name}`}
      className="m-auto cursor-pointer"
      key={tabItem.id}
      onMouseEnter={() => {
        handleMouseEnter(tabItem.name);
      }}
      onMouseLeave={() => {
        handleMouseLeave();
      }}
    >
      <div className="flex-col items-center justify-center">
        <Image
          src={
            router.pathname.split('/')[1] === tabItem.name ||
            isHovering === tabItem.name
              ? `/svg/icons/Tab/${tabItem.name}_focus.svg`
              : `/svg/icons/Tab/${tabItem.name}.svg`
          }
          className="mx-auto"
          width={28}
          height={28}
          alt={tabItem.name}
        />
        <div
          className={`mt-1 w-full text-center text-11 font-medium ${
            router.pathname.split('/')[1] === tabItem.name ||
            isHovering === tabItem.name
              ? 'text-brand'
              : 'text-[#767676]'
          } `}
        >
          {tabItem.word}
        </div>
      </div>
    </Link>
  );
}
