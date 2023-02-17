import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Complete() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate
        message="작가 등록"
        isLeftButton={false}
        handleRightButton={() => {
          router.push('/home');
        }}
      />
      <section className="relative flex h-[40rem] flex-col items-center justify-center text-center">
        <Image
          alt="congratulations"
          src="/image/congratulations.png"
          fill
          className="object-contain"
        />
        <div className="h-8 text-18 font-bold">작가 등록이 완료되었습니다.</div>
        <div className="#767676 text-12 text-[#767676]">
          <p>아띠즈에서 학력 인증 확인 후 알림을 드리겠습니다.</p>
          <p>심사는 3일(영업일) 이내 진행됩니다.</p>
        </div>
        <div className=" z-50 text-12">
          <p>instagram으로 연락 주시면 빠르 시일 내에 확인하겠습니다.</p>
          <Link href="https://www.instagram.com/atties_art/">@atties_art</Link>
        </div>
      </section>
    </Layout>
  );
}
