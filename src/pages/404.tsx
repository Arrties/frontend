import Layout from '@components/common/Layout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'stories/Button';

interface Page404Props {
  [key: string]: any;
}
export default function Page404Props() {
  const router = useRouter();
  return (
    <Layout>
      <p className="flex h-full flex-col items-center justify-center gap-10">
        존재하지 않는 페이지입니다.
        <Button
          text="홈으로 바로가기"
          onClick={() => {
            router.push('/home');
          }}
        />
      </p>
    </Layout>
  );
}
