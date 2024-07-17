import { NavLink } from 'react-router-dom'; // Import for navigation links
import styles from './Footer.module.css';
import { useContext } from 'react';
import { CartContext } from './App';
import Cart from '/cart.svg';
const Footer = () => {
  const { inCart } = useContext(CartContext);
  const total = inCart.length;
  return (
    <div className={styles.footer}>
      <div className="footer-links">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="shopping">Shopping</NavLink>
          </li>{' '}
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
      </div>
      <div className="info">
        <p>&copy; {new Date().getFullYear()} Amalgam All Rights Reserved.</p>
        <p>
          <a target="_blank" href="https://www.facebook.com/">
            Facebook
          </a>{' '}
          |{' '}
          <a target="_blank" href="https://www.instagram.com/">
            Instagram
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
