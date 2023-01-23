import instance from '@apis/_axios/instance'
import Layout from '@components/common/Layout'
import Loader from '@components/common/Loader'
import { useEffect } from 'react'
import { setToken } from '@utils/localStorage/token'
import { Token } from '@utils/localStorage/token'
import { useRouter } from 'next/router'

export default function NaverCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');
    instance
      .get(`/oauth2/naver?code=${code}&state=${state}`)
      .then((res) => {
        const token: Token = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          roles: res.data.roles,
        };
        if (token) setToken(token);
      })
      .then(() => router.push('/home'))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Loader />
    </Layout>
  );
}
