import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import WishCard from '@components/profile/WishCard';
import tw from 'tailwind-styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useGetWish from '@hooks/queries/profile/useGetWish';

interface defaultProps {
  [key: string]: any;
}

const WishContainer = tw.div<defaultProps>`
w-full grid grid-cols-2 gap-x-[15px] gap-y-[23px]
`;

export default function Wish() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/profile');
  };
  const { data: wishList } = useGetWish() || [];
  console.log(wishList);
  return (
    <Layout>
      <Navigate
        message="찜 목록"
        isRightButton={false}
        handleLeftButton={handleBack}
      />
      <WishContainer>
        {wishList?.map((wish: WishArtwork) => (
          <WishCard key={wish.id} wish={wish || {}} />
        ))}
      </WishContainer>
    </Layout>
  );
}
