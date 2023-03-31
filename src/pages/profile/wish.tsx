import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import WishCard from '@components/profile/WishCard';
import tw from 'tailwind-styled-components';
import React from 'react';
import useGetWish from '@hooks/queries/profile/useGetWish';
import None from '@components/common/None';

interface defaultProps {
  [key: string]: any;
}

const WishContainer = tw.div<defaultProps>`
w-full grid grid-cols-2 gap-x-[0.9375rem] gap-y-[1.4375rem]
`;

export default function Wish() {
  const { data: wishList } = useGetWish() || [];
  return (
    <Layout>
      <Navigate message="관심 목록" isRightButton={false} />

      {wishList?.length ? (
        <WishContainer>
          {wishList?.map((wish: WishArtwork) => (
            <WishCard key={wish.id} wish={wish} />
          ))}
        </WishContainer>
      ) : (
        <None path="wish" message="관심 작품이 없어요." />
      )}
    </Layout>
  );
}
