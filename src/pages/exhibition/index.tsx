import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import AuctionItem from '@components/exhibition/AuctionItem';
import { useGetExhibition } from '@hooks/queries/useGetExhibition';

export default function Exhibition() {
  const { data } = useGetExhibition();
  console.log(data);
  return (
    <Layout>
      <Navigate message="전시회" isRightButton={false} />
      <div className="pt-8">
        {data?.map((auction, idx) => (
          <AuctionItem key={idx} auctionList={auction} />
        ))}
      </div>
    </Layout>
  );
}
