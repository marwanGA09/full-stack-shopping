import axios from 'axios';

export default async function fetcher(params) {
  const url = params
    ? `http://localhost:8888/products/${params}`
    : `http://localhost:8888/products`;

  // JSON SERVER FILE
  // const url = params
  //   ? `http://localhost:3001/products/${params}`
  //   : `http://localhost:3001/products`;
  try {
    const res = await axios.get(url);
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
    throw new Error('Something went Wrong before fetching');
  }
  // return await res.json();
}
