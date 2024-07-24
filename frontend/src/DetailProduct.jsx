import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from './Button';
import { useContext, useState } from 'react';
import { CartContext } from './App';
import { useQuery } from '@tanstack/react-query';
import fetcher from './fetcher';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import styles from './DetailProduct.module.css';
import Counter from './Counter';

function DetailProduct() {
  const [count, setCount] = useState(1);
  const params = useParams();
  const { data, error, isPending } = useQuery({
    queryKey: [params.id],
    queryFn: () => fetcher(params.id),
    // staleTime: 10 * 60 * 60,
  });

  const cartObject = {
    id: data?.id,
    price: data?.price,
    name: data?.title,
    count,
  };

  function handleCount(inp) {
    if (inp < data.rating.count) {
      setCount(inp > 0 ? inp : 1);
    } else {
      setCount(data.rating.count);
    }
  }

  const { onInCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="detailProduct"> */}
      {isPending && <Loading />}
      {error && <ErrorPage error={error} />}
      {data && (
        <div className={styles.detail}>
          <img src={data.image} width={400} />
          <h3>{data.title}</h3>
          <p className={styles.abs}>Count: {data.rating.count}</p>
          <p>{data.description}</p>
          <p>
            <em>Price: ${Number(data.price).toFixed(1)}</em>
          </p>
          <div>
            <Counter count={count} onCount={handleCount} />
            <Button
              text={'Add To cart'}
              size={1}
              bg="#95C675"
              color="white"
              onClickFun={(e) => {
                e.preventDefault();
                onInCart(cartObject);
              }}
            />
            <Button size={1} text={'back'} onClickFun={() => navigate(-1)} />
          </div>
        </div>
      )}
      {/* {!isPending && } */}
      {/* </div> */}
    </>
  );
}

export default DetailProduct;
