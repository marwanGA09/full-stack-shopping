import ProductDisplay from './ProductDisplay';
import { useQuery } from '@tanstack/react-query';
import fetcher from './fetcher';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import styles from './ShoppingPage.module.css';

function ShoppingPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetcher(''),
    // staleTime: 9 * 60 * 60,
  });

  console.log('error inthe shopping page', error);

  return (
    <div className={styles.shopping}>
      {isPending && <Loading />}
      {error && <ErrorPage error={error} />}

      {data && (
        <>
          <h2>Don&apos;t Miss Out on Our Latest Deals</h2>{' '}
          <div className={styles.grid}>
            {data.map((pro) => (
              <ProductDisplay product={pro} key={pro.id} />
            ))}{' '}
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingPage;
