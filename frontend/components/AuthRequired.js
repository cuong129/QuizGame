import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Cookies from 'js-cookie';

export default function AuthRequired({ children, nextPage = '' }) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!token) {
      Cookies.remove('token');
      // Redirect to login page
      router.replace('/login').then((_) => console.log('Go to login'));
    } else if (token && !!nextPage) {
      router.push(nextPage).then((_) => console.log(`Go to ${nextPage}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <React.Fragment>{token ? children : <h2>Loading...</h2>}</React.Fragment>
  );
}
