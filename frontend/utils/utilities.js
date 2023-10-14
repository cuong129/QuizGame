import Cookies from 'js-cookie';
export function makeCustomHeaders() {
  return {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    Authorization: Cookies.get('token') || '',
  };
}
