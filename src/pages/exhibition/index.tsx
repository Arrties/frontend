import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import AuctionItem from '@components/exhibition/AuctionItem';

interface AuctionListForm {
  src: string;
  date: string;
  artRegister: number;
  status: boolean;
  id: number;
}

const DUMP_PREV_AUCTION_LISTS: AuctionListForm[] = [
  {
    src: '/svg/example/exhibition.svg',
    date: '2023.02.07~2023.02.13',
    artRegister: 20,
    status: true,
    id: 3,
  },
  {
    src: '/svg/example/exhibition.svg',
    date: '2023.01.07~2023.01.13',
    artRegister: 20,
    status: false,
    id: 1,
  },
  {
    src: '/svg/example/exhibition.svg',
    date: '2022.12.07~2022.12.13',
    artRegister: 20,
    status: false,
    id: 2,
  },
];

export default function Exhibition() {
  return (
    <Layout>
      <Navigate message="전시회" isRightButton={false} />
      <div className="pt-8">
        {DUMP_PREV_AUCTION_LISTS.map((auctionList, idx) => (
          <AuctionItem key={idx} auctionList={auctionList} />
        ))}
      </div>
    </Layout>
  );
}
