import '../styles/globals.css';

import store from '@features/store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';
import Loader from '@components/common/Loader';
import { Suspense, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { getToken } from '@utils/localStorage/token';
import Script from 'next/script';
import { CONFIG } from '@config';
import { pageview } from '@utils/gtag';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: { retry: 0, useErrorBoundary: true },
  },
});
const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (router.pathname.includes('auth') || router.pathname === '/begin')
      return;
    const token = getToken();
    if (!token.accessToken) router.replace('/begin');
  }, [router]);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex h-screen w-screen justify-center bg-slate-50 font-Pretendard">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>Atties</title>
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GOOGLE_TAG}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONFIG.GOOGLE_TAG}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </div>
  );
}

export { queryClient };
