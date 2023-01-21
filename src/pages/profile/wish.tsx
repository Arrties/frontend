import Layout from '@components/common/Layout'
import Navigate from '@components/common/Navigate'
import WishCard from '@components/profile/wish/WishCard'
import tw from 'tailwind-styled-components'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

interface defaultProps {
  [key: string]: any;
}

const WishContainer = tw.div<defaultProps>`
w-full grid grid-cols-2 gap-x-[15px] gap-y-[23px]
`;

interface WishForm {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  status1: string;
  status2: string;
}

const DUMP_WISHLIST: WishForm[] = [
  {
    id: '1',
    image: '',
    name: '퓨처리즘',
    description: '자연과 공생하는 미래',
    price: 250000,
    status1: '입찰중',
    status2: 'HOT',
  },
  {
    id: '2',
    image: '',
    name: '퓨처리즘',
    description: '자연과 공생하는 미래',
    price: 250000,
    status1: 'NEW',
    status2: '입찰완료',
  },
  {
    id: '3',
    image: '',
    name: '퓨처리즘',
    description: '자연과 공생하는 미래',
    price: 250000,
    status1: 'HOT',
    status2: '입찰완료',
  },
];

export default function Wish() {
  const [wishList, setWishList] = useState(DUMP_WISHLIST);
  const router = useRouter();
  const handleBack = () => {
    router.push('/profile');
  };
  return (
    <Layout>
      <Navigate
        message="찜 목록"
        isRightButton={false}
        handleLeftButton={handleBack}
      />
      <WishContainer>
        {wishList.map((wish: WishForm) => (
          <WishCard key={wish.id} wish={wish} />
        ))}
      </WishContainer>
    </Layout>
  );
}
