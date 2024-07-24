import { useContext, useMemo } from 'react';
import { CartContext } from './App';
import Button from './Button';
import styles from './CartPage.module.css';
import { redirect, useNavigate } from 'react-router-dom';

function CartPage() {
  const { inCart, cartSetter } = useContext(CartContext);
  const navigate = useNavigate();
  // console.log('price', totalPrice());
  const totalPrice = useMemo(
    function totalPrice() {
      return inCart.reduce((pre, cur) => {
        return pre + Number(cur.price) * cur.count;
      }, 0);
    },
    [inCart]
  );

  function handleRemoveItem(itemId) {
    cartSetter((cart) => {
      const filtered = cart.filter((item) => item.id !== itemId);
      // console.log(filtered);
      if (filtered.length === 0) {
        // alert('empth');
        navigate('/shopping');
      }
      return filtered;
    });
  }

  return (
    <div className={styles.cartPage}>
      <h3>Cart page</h3>
      {inCart.map((item) => (
        <CartItem item={item} key={item.id} onCancel={handleRemoveItem} />
      ))}
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <Button
        text="Checkout"
        onClickFun={() => {
          alert(`You check outed $${totalPrice} successfully`);
        }}
      />
    </div>
  );
}

function CartItem({ item, onCancel }) {
  return (
    <div className={styles.cartItem}>
      <p>{item.name}</p>
      <p>Total Num: {item.count}</p>
      <p>Total Price: ${item.count * Number(item.price)}</p>
      <div>
        <Button text={'Cancel'} onClickFun={() => onCancel(item.id)} />
      </div>
    </div>
  );
}

export default CartPage;
