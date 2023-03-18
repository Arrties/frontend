import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import React from 'react';

const TABLIST = [
  {
    id: 1,
    name: 'home',
    word: '홈',
  },
  {
    id: 2,
    name: 'auction',
    word: '경매',
  },
  {
    id: 3,
    name: 'exhibition',
    word: '전시회',
  },
  {
    id: 4,
    name: 'chat',
    word: '채팅',
  },
  {
    id: 5,
    name: 'profile',
    word: '프로필',
  },
];

interface DefaultProps {
  [key: string]: any;
}

const TabBox = tw.footer<DefaultProps>`
 fixed inset-x-0 bottom-0 bg-white max-w-[26.25rem] flex justify-center z-50 py-2 inset-x-0 m-auto px-3
`;

const TabList = tw.div<DefaultProps>`flex w-full`;

interface TabItemProps {
  id: number;
  name: string;
  word: string;
  [key: string]: any;
}

export default React.memo(function Tab() {
  const router = useRouter();
  const handleTabItem = (name: string) => {
    router.push(`/${name}`);
  };
  return (
    <TabBox>
      <TabList>
        {TABLIST.map((tabItem: TabItemProps) => (
          <div
            className="m-auto cursor-pointer"
            key={tabItem.id}
            onClick={() => {
              handleTabItem(tabItem.name);
            }}
          >
            <div className="flex-col items-center justify-center">
              <Image
                src={
                  router.pathname.split('/')[1] === tabItem.name
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
                  router.pathname.split('/')[1] === tabItem.name
                    ? 'text-brand'
                    : 'text-[#767676]'
                } `}
              >
                {tabItem.word}
              </div>
            </div>
          </div>
        ))}
      </TabList>
    </TabBox>
  );
});
