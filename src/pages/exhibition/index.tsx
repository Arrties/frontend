import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
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
          <div className="mt-[100%] flex flex-col items-center justify-center">
            <Image
              alt="auction"
              src="/svg/icons/Tab/icon_exhibition.svg"
              width="54"
              height="54"
            />
            <p className="mt-3 text-16 font-medium text-[#999999]">
              아직 진행중인 전시회가 없어요
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
