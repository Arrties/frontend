import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';

export default function History() {
  const router = useRouter();
  return <Layout></Layout>;
}
