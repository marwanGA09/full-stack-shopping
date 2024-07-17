import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className="hero-content">
        <h1>
          Unleash Your Amalgam: <br />
          Electronics, Jewelry, and Fashion Await
        </h1>
        <p>
          Discover a vibrant collection of electronics, exquisite jewelry, and
          trendy clothing for men and women, all under one roof.
        </p>
        <button>
          <Link to={'/shopping'}>Explore Our Collections</Link>
        </button>
      </div>
    </section>
  );
}

export default Hero;
