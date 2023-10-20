import '@/styles/globals.css';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';
import AuthRequired from '@/components/AuthRequired';
import { useRouter } from 'next/router';
import axios from 'axios';
import https from 'https';
import Head from 'next/head';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
/*
 * Disable SSL
 */
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* {router.pathname === '/login' ? (
          <Component {...pageProps} />
        ) : (
          <AuthRequired>
            <Component {...pageProps} />
          </AuthRequired>
        )} */}
        <Head>
          <title>Hành Trình Văn Minh</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
