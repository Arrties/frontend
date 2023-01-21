import Layout from '@components/common/Layout'
import { useRouter } from 'next/router'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

export default function Home() {
  const router = useRouter();

  router.replace('/begin');
  return <Layout></Layout>;
}
