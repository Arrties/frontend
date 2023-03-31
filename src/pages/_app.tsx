import '../styles/globals.css';

import store from '@features/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Loader from '@components/common/Loader';
import { Suspense, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { getToken } from '@utils/localStorage/token';
import { pageview } from '@utils/gtag';
import GoogleScript from '@components/GoogleScript';
import MetaHead from '@components/MetaHead';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: { retry: false, useErrorBoundary: true },
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
    if (!token.accessToken) router.replace('/auth/login');
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
    <div className="flex h-screen w-screen justify-center bg-slate-50 ">
      <MetaHead />
      <GoogleScript />
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
              </PersistGate>
            </Hydrate>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </div>
  );
}

export { queryClient };
