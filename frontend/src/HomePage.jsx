import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import styles from './HomePage.module.css';
function HomePage() {
  return (
    <div className={styles.home}>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomePage;
