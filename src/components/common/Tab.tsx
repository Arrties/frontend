import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

const TABLIST = [
  {
    id: 1,
    name: 'home',
    hangle: '홈',
  },
  {
    id: 2,
    name: 'auction',
    hangle: '경매',
  },
  {
    id: 3,
    name: 'exhibition',
    hangle: '전시회',
  },
  {
    id: 4,
    name: 'chat',
    hangle: '채팅',
  },
  {
    id: 5,
    name: 'profile',
    hangle: '프로필',
  },
];

interface DefaultProps {
  [key: string]: any;
}

const TabBox = tw.footer<DefaultProps>`
 fixed bottom-0 bg-white w-full max-w-[375px] flex justify-center z-50 py-4 rounded-t-2xl
`;

const TabList = tw.div<DefaultProps>`flex w-[327px]`;

interface TabItemProps {
  id: number;
  name: string;
  hangle: string;
  [key: string]: any;
}

export default function Tab() {
  const router = useRouter();
  const handleTabItem = (name) => {
    router.push(`/${name}`);
  };
  return (
    <TabBox>
      <TabList>
        {TABLIST.map((tabItem: TabItemProps) => (
          <div
            className="m-auto cursor-pointer"
            key={tabItem.id}
            onClick={() => handleTabItem(tabItem.name)}
          >
            <div className="flex-col items-center justify-center">
              <Image
                src={
                  router.pathname.split('/')[1] === tabItem.name
                    ? `/svg/icons/Tab/icon_${tabItem.name}_focus.svg`
                    : `/svg/icons/Tab/icon_${tabItem.name}.svg`
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
                {tabItem.hangle}
              </div>
            </div>
          </div>
        ))}
      </TabList>
    </TabBox>
  );
}
