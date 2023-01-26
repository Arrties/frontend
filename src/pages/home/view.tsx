import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import ExhibitionItem from '@components/home/ExhibitionItem';
import Navigate from '@components/common/Navigate';

const DUMP_ART_LISTS = [
  {
    image: '/svg/example/exhibition.svg',
    education: '홍익대학교',
    title: '작품이름',
  },
  {
    image: '/svg/example/detail.svg',
    education: '서울대학교',
    title: '작품이름',
  },
  {
    image: '/svg/example/exhibition.svg',
    education: '연세대학교',
    title: '작품이름',
  },
  {
    image: '/svg/example/detail.svg',
    education: '고려대학교',
    title: '작품이름',
  },
  {
    image: '/svg/example/exhibition.svg',
    education: '건국대학교',
    title: '작품이름',
  },
];

export default function View() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate isRightButton={false} />
      <div>
        <p className="text-[14px] font-semibold text-[#767676]">
          영서님 취향의
        </p>
        <p className="text-[20px] font-bold text-[#191919]">이번 주 전시작품</p>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {DUMP_ART_LISTS.map((art, idx) => (
          <ExhibitionItem
            src={art.image}
            education={art.education}
            title={art.title}
            key={idx}
          />
        ))}
      </div>
    </Layout>
  );
}
