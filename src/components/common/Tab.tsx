import Image from 'next/image'
import tw from 'tailwind-styled-components'
import { useRouter } from 'next/router'

const TABLIST = [
  {
    id: 1,
    name: 'home',
  },
  {
    id: 2,
    name: 'auction',
  },
  {
    id: 3,
    name: 'exhibition',
  },
  {
    id: 4,
    name: 'chat',
  },
  {
    id: 5,
    name: 'profile',
  },
];

interface DefaultProps {
  [key: string]: any;
}

const TabBox = tw.footer<DefaultProps>`
  absolute top-[47rem] bg-white inset-x-0 m-auto flex justify-center h-[4rem] z-50
`;

const TabList = tw.div<DefaultProps>`flex w-[327px]`;

interface TabItemProps {
  id: number;
  name: string;
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
            <Image
              src={
                router.pathname.split('/')[1] === tabItem.name
                  ? `/svg/icons/Tab/icon_${tabItem.name}_focus.svg`
                  : `/svg/icons/Tab/icon_${tabItem.name}.svg`
              }
              width={28}
              height={28}
              alt={tabItem.name}
            />
          </div>
        ))}
      </TabList>
    </TabBox>
  );
}
