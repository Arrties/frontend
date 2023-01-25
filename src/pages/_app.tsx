import '../styles/globals.css';

import store from '@features/store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import type { AppProps } from 'next/app';
const queryClient = new QueryClient();
const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (router.pathname.includes('auth')) return;
  //   const token = getToken();
  //   if (!token.accessToken) router.replace('/auth/login');
  // }, [router]);

  return (
    <div className="relative mx-auto h-screen w-full max-w-[375px] overflow-y-auto border border-gray-500 font-Pretendard">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}
