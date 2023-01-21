import favorite from '@public/svg/icons/icon_favorite.svg'
import Image from 'next/image'
import tw from 'tailwind-styled-components'

interface DefaultProps {
  [key: string]: any;
}

const WishCardContainer = tw.div<DefaultProps>`
rounded-lg hover:ring-1 hover:ring-blue-500 cursor-pointer
`;

interface StatusForm {
  id: string;
  status: string;
}

export default function WishCard({ wish }) {
  const statusList: StatusForm[] = [
    {
      id: '1',
      status: wish.status1,
    },
    {
      id: '2',
      status: wish.status2,
    },
  ];
  return (
    <WishCardContainer>
      <div className="h-28 bg-gray-300 rounded-t-lg relative">
        <Image
          className="absolute top-3 right-3"
          src={favorite}
          alt="favorite"
        />
      </div>
      <div className="h-30 p-3 rounded-b-lg border-x-[1px] border-[#ededed] border-b-[1px]">
        <div className="flex text-white w-[84px] text-[10px]">
          {statusList.map((statusItem) => (
            <div
              className={`w-1/2 h-[17px] bg-[${
                statusItem.status === '입찰중'
                  ? '#4B9E77'
                  : statusItem.status === 'HOT'
                  ? '#F5535D'
                  : statusItem.status === '입찰완료'
                  ? '#191919'
                  : statusItem.status === 'NEW'
                  ? '#7B61FF'
                  : ''
              }]  flex justify-center items-center text-10`}
              key={statusItem.id}
            >
              {statusItem.status}
            </div>
          ))}
        </div>
        <div className="pt-[6px]">
          <div className="text-14 leading-4">{wish.name}</div>
          <div className="text-12 leading-6">{wish.description}</div>
          <div className="text-14 leading-6 font-bold ">
            {wish.price.toLocaleString()}원
          </div>
        </div>
      </div>
    </WishCardContainer>
  );
}
