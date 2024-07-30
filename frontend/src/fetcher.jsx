import axios from 'axios';
import myURL from './URL/url';
export default async function fetcher(params) {
  const url = params ? `${myURL}/products/${params}` : `${myURL}/products`;
  console.log('url', url);
  try {
    const res = await axios.get(url);
    console.log('res', res);
    if (res.statusText.toLowerCase() !== 'ok') {
      // Check for CORS error based on specific status codes or response format
      if (res.status === 403) {
        // This is a suggestion, check server specific behavior
        throw new Error('CORS Error: Access Denied');
      } else {
        throw new Error('Something went Wrong, while fetching');
      }
    }
    return res.data;
  } catch (err) {
    console.log('error', err);
    return [];
  }
  // return await res.json();
}
