import Layout from '@components/common/Layout';
import { getLocalStorage } from '@utils/localStorage/helper';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  if (getLocalStorage('isVisited')) {
    router.replace('/auth/login');
  } else {
    router.replace('/begin');
  }

  return <Layout></Layout>;
}
