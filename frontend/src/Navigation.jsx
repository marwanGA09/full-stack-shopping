import styles from './Navigation.module.css';
import Logo from '/logo.svg';
import Cart from '/cart.svg';
import { useContext } from 'react';

import { CartContext } from './App';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const { inCart } = useContext(CartContext);
  const total = inCart.length;
  return (
    <nav className={styles.nav}>
      <li>
        <NavLink to="/">
          <img src={Logo} width="22rem" alt="" /> <span>Amalgam</span>
        </NavLink>
      </li>

      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="shopping">Shopping</NavLink>
        </li>
        {total > 0 && (
          <li>
            <NavLink to="cart">
              <img src={Cart} alt="" />
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}
