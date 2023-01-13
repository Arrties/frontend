import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import Navigate from '@components/common/Navigate';

export default function Complete() {
  const router = useRouter();
  const handleRightButton = () => {
    router.push('/profile');
  };
  return (
    <Layout>
      <Navigate
        message="작가 등록"
        isLeftButton={false}
        handleRightButton={handleRightButton}
      />
      <section className="h-[40rem] flex flex-col items-center justify-center text-center ">
        <div className="text-18 font-bold h-8">작가 등록이 완료되었습니다.</div>
        <div className="#767676 text-12 text-[#767676]">
          <p>아띠즈에서 학력 인증 확인 후 알림을 드리겠습니다.</p>
          <p>심사는 3일(영업일) 이내 진행됩니다.</p>
        </div>
      </section>
    </Layout>
  );
}
