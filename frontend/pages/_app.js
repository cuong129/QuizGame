import '@/styles/globals.css';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';
import AuthRequired from '@/components/AuthRequired';
import { useRouter } from 'next/router';
import axios from 'axios';
import https from 'https';

axios.defaults.baseURL = 'https://localhost:7255/api/';
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
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
