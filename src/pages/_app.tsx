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
import HeadMeta from '@components/HeadMeta';
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

  return loading ? (
    <Loader />
  ) : (
    <div className="flex h-screen w-screen justify-center bg-slate-50 font-Pretendard">
      <HeadMeta />

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
