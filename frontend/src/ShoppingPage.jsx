import ProductDisplay from './ProductDisplay';
import { useQuery } from '@tanstack/react-query';
import fetcher from './fetcher';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import styles from './ShoppingPage.module.css';
import { useEffect, useState } from 'react';

import myURL from './URL/url';

function ShoppingPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetcher(''),
    // staleTime: 9 * 60 * 60,
  });

  // const [isPending, setIsPending] = useState(false);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   setIsPending(true);
  //   fetch(`${myURL}/products`)
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((dat) => {
  //       console.log(dat);
  //       setData(dat);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(true);
  //     })
  //     .finally(setIsPending(false));
  // }, []);

  return (
    <div className={styles.shopping}>
      {isPending && <Loading />}
      {error && <ErrorPage error={error} />}

      {data && (
        <>
          <h2>Don&apos;t Miss Out on Our Latest Deals</h2>{' '}
          <div className={styles.grid}>
            {data.map((pro) => (
              <ProductDisplay product={pro} key={pro._id} />
            ))}{' '}
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingPage;
