import axios from 'axios';
import myURL from './URL/url';
export default async function fetcher(params) {
  const url = params ? `${myURL}/products/${params}` : `${myURL}/products`;
  console.log('url', url);
  try {
    const res = await axios.get(url);
    console.log('res', res);

    return res.data;
  } catch (err) {
    console.log('error', err);
    return [];
  }
  // return await res.json();
}
