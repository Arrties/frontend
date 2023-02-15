import Layout from '@components/common/Layout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Page404Props {
  [key: string]: any;
}
export default function Page404Props() {
  return <Layout>존재하지 않는 페이지입니다.</Layout>;
}
