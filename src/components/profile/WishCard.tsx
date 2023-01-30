import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface DefaultProps {
  [key: string]: any;
}

const WishCardContainer = tw.div<DefaultProps>`
rounded-lg hover:ring-1 hover:ring-blue-500 cursor-pointer
`;

interface StatusForm {
  id: number;
  image: string;
  price: number;
  title: string;
}

export default function WishCard({ wish }) {
  console.log(wish);
  return (
    <WishCardContainer>
      <div className="relative h-28  bg-gray-300">
        <Image
          className="absolute top-3 right-3 rounded-t-lg"
          src={wish?.image || '/svg/icons/icon_favorite.svg'}
          alt="favorite"
          fill
        />
      </div>
      <div className="h-30 rounded-b-lg border-x-[1px] border-b-[1px] border-[#ededed] p-3">
        <div className="flex w-[84px] text-[10px] text-white">
          {/* {wish &&
            wish.map((statusItem) => (
              <div
                className={`h-[17px] w-1/2 bg-[${
                  statusItem.status === '입찰중'
                    ? '#4B9E77'
                    : statusItem.status === 'HOT'
                    ? '#F5535D'
                    : statusItem.status === '입찰완료'
                    ? '#191919'
                    : statusItem.status === 'NEW'
                    ? '#7B61FF'
                    : ''
                }]  flex items-center justify-center text-10`}
                key={statusItem.id}
              >
                {statusItem.status}
              </div>
            ))} */}
        </div>
        <div className="pt-[6px]">
          <div className="text-14 leading-4">{wish.title}</div>
          <div className="text-12 leading-6">{wish.description}</div>
          <div className="text-14 font-bold leading-6 ">
            {wish.price.toLocaleString()}원
          </div>
        </div>
      </div>
    </WishCardContainer>
  );
}
