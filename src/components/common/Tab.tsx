import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TabItem from './TabItem';

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

  return (
    <TabBox>
      <TabList>
        {TABLIST.map((tabItem: TabItemProps) => (
          <TabItem tabItem={tabItem} key={tabItem.id} />
        ))}
      </TabList>
    </TabBox>
  );
});
