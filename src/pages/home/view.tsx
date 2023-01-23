import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import ExhibitionItem from '@components/home/ExhibitionItem';
import Navigate from '@components/common/Navigate';

const DUMP_ART_LISTS = [
  {
    src: '/svg/example/exhibition.svg',
    school: '홍익대학교',
    name: '작품이름',
  },
  { src: '/svg/example/detail.svg', school: '서울대학교', name: '작품이름' },
  {
    src: '/svg/example/exhibition.svg',
    school: '연세대학교',
    name: '작품이름',
  },
  { src: '/svg/example/detail.svg', school: '고려대학교', name: '작품이름' },
  {
    src: '/svg/example/exhibition.svg',
    school: '건국대학교',
    name: '작품이름',
  },
];

export default function View() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate isRightButton={false} />
      <div>
        <p className="text-[#767676] text-[14px] font-semibold">
          영서님 취향의
        </p>
        <p className="text-[#191919] text-[20px] font-bold">이번 주 전시작품</p>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {DUMP_ART_LISTS.map((art, idx) => (
          <ExhibitionItem
            src={art.src}
            school={art.school}
            name={art.name}
            key={idx}
          />
        ))}
      </div>
    </Layout>
  );
}
