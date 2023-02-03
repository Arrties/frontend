import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ArtWorkItem from '@components/profile/ArtItem';
import useGetBid from '@hooks/queries/artwork/useGetBid';
import React from 'react';

export default function bid() {
  const { data: bidList } = useGetBid();
  console.log(bidList);
  return (
    <Layout>
      <Navigate isRightButton={false} message="구매작품  " />
      <p className="text-14">
        <span className="text-brand ">2건</span>의 구매작품이 있습니다.
      </p>
      <ArtWorkItem
        lastChild={
          <p>
            <span className="rounded bg-[#767676] px-1 py-0.5 text-10 text-[#FFF]">
              배송완료
            </span>
            <span className="ml-1 text-14 font-bold text-brand">450,000원</span>
          </p>
        }
      />
      <ArtWorkItem
        lastChild={
          <p>
            <span className="rounded bg-[#767676] px-1 py-0.5 text-10 text-[#FFF]">
              배송완료
            </span>
            <span className="ml-1 text-14 font-bold text-brand">450,000원</span>
          </p>
        }
      />
      <ArtWorkItem
        lastChild={
          <p>
            <span className="rounded bg-[#767676] px-1 py-0.5 text-10 text-[#FFF]">
              배송완료
            </span>
            <span className="ml-1 text-14 font-bold text-brand">450,000원</span>
          </p>
        }
      />
    </Layout>
  );
}
