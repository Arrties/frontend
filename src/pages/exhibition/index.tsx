import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Navigate from '@components/common/Navigate';
import AuctionItem from '@components/exhibition/AuctionItem';
import { useGetExhibition } from '@hooks/queries/useGetExhibition';

export default function Exhibition() {
  const { data, isLoading } = useGetExhibition();

  if (isLoading) return <Loader />;

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
