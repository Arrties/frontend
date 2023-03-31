import instance from '@apis/_axios/instance';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import { useEffect } from 'react';
import { setToken } from '@utils/localStorage/token';
import { Token } from '@utils/localStorage/token';
import { useRouter } from 'next/router';

export default function KakaoCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    instance
      .get(`/oauth2/kakao?code=${code}`)
      .then((response) => {
        const token: Token = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          roles: response.data.roles,
        };
        if (token) setToken(token);
      })
      .then(() => router.push('/home'))
      .catch((err) => {
        err;
      });
  }, []);

  return (
    <Layout>
      <Loader />
    </Layout>
  );
}
