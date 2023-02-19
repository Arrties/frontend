import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import None from '@components/common/None';
import AuctionItem from '@components/exhibition/AuctionItem';
import { useGetExhibition } from '@hooks/queries/useGetExhibition';
import Image from 'next/image';

export default function Exhibition() {
  const { data } = useGetExhibition();

  return (
    <Layout>
      <Navigate message="전시회" isRightButton={false} />
      <div className="pt-8">
        {data && data.length > 0 ? (
          data?.map((auction, idx) => (
            <AuctionItem key={idx} auctionList={auction} />
          ))
        ) : (
          <None path="exhibition" message="아직 진행중인 경매가 없어요" />
        )}
      </div>
    </Layout>
  );
}
