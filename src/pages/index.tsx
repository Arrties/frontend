import Layout from '@components/common/Layout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  router.replace('/begin');
  return <Layout></Layout>;
}
