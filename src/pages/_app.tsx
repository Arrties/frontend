import '../styles/globals.css'

import store from '@features/store'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRouter } from 'next/router'

import type { AppProps } from 'next/app';
const queryClient = new QueryClient();
const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname.includes('auth')) return;
  //   const token = getToken();
  //   if (!token.accessToken) router.replace('/auth/login');
  // }, [router]);

  return (
    <div className="mx-auto w-full max-w-[375px]">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Component {...pageProps} />
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}
