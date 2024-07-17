import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext, useState } from 'react';
import { CartContext } from './App';
import styles from './ProductDisplay.module.css';
import Counter from './Counter';

function ProductDisplay({ product }) {
  const [count, setCount] = useState(1);
  const { onInCart } = useContext(CartContext);

  const cartObject = {
    id: product?.id,
    price: product?.price,
    name: product?.title,
    count,
  };

  function handleCount(inp) {
    if (inp < product.rating.count) {
      setCount(inp > 0 ? inp : 1);
    } else {
      setCount(product.rating.count);
    }
  }
  return (
    <div className={styles.display}>
      <div className="first">
        <div className={styles.price}>
          <span>${(Number(product.price) * 1.1).toFixed(1)} </span>
          <span>${Number(product.price).toFixed(1)}</span>
        </div>
        <img src={product.image} width="300px" />
      </div>

      <div className={styles.counter}>
        <Counter count={count} onCount={handleCount} />
      </div>

      <div className={styles.last}>
        <Button
          text={'Add To cart'}
          bg="#4dc200"
          color="#efefef"
          size={2.5}
          onClickFun={(e) => {
            e.preventDefault();
            onInCart(cartObject);
          }}
        />
        <Link
          to={`/shopping/${product.id}?ie=${product.image
            .slice(0, -4)
            .split('/')
            .at(-1)}`}
        >
          More ...
        </Link>{' '}
      </div>
    </div>
  );
}

export default ProductDisplay;
