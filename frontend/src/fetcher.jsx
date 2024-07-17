import axios from 'axios';

export default async function fetcher(params) {
  const url = params
    ? `http://localhost:3001/products/${params}`
    : `http://localhost:3001/products`;
  try {
    const res = await axios.get(url);
    if (res.statusText.toLowerCase() !== 'ok') {
      throw new Error('Something went Wrong, while fetching');
    }
    return res.data;
  } catch (err) {
    throw new Error('Something went Wrong before fetching');
  }
  // return await res.json();
}
