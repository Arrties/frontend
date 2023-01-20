import Layout from '@components/common/Layout';
import { useEffect } from 'react';
import instance from '@apis/_axios/instance';
import { setToken } from '@utils/localStorage/token';
import { Token } from '@utils/localStorage/token';
import { useRouter } from 'next/router';
import Loader from '@components/common/Loader';

export default function KakaoCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    instance
      .get(`/oauth2/kakao?code=${code}`)
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
