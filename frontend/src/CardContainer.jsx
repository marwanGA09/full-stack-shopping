import { Link } from 'react-router-dom';
import styles from './CardContainer.module.css';

function CardContainer() {
  return (
    <div className={styles.container}>
      {initialCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardContainer;

function Card({ card }) {
  const { image, headline, description, btn } = card;
  return (
    <div className={styles.card}>
      <img src={image} alt={headline} />
      <h4>{headline}</h4>
      <p>{description}</p>
      <button>
        {' '}
        <Link to={'/shopping'}>{btn}</Link>
      </button>
    </div>
  );
}

const initialCards = [
  {
    id: 1,
    image:
      'https://i.pcmag.com/imagery/lineups/067nHL7x7FLjB28RuLvKFzS-1..v1569470817.jpg',
    headline: 'Upgrade Your Tech Life',
    description:
      'Find the latest gadgets, from cutting-edge laptops and smartphones to immersive gaming consoles and smart home devices.',
    btn: 'Shop Electronics',
  },

  {
    id: 2,
    image:
      'https://www.shutterstock.com/image-photo/trendy-woman-sitting-on-vintage-600nw-2023605335.jpg',
    headline: `Dress to Impress: Men's & Women's Fashion`,
    description: `Dress to Impress: Men's & Women's Fashion
Short Description: Discover the latest trends in clothing for men and women, from casual wear and activewear to formal attire and statement pieces.`,
    btn: 'Shop Fashion',
  },
  {
    id: 3,
    image: 'https://m.media-amazon.com/images/I/61WBWd+EHsL._AC_UY1000_.jpg',
    headline: 'Elevate Your Style with Timeless Pieces',
    description:
      'Discover a dazzling collection of jewelry for every occasion, from delicate bracelets and shimmering earrings to statement necklaces and bold rings.',
    btn: 'Shop Jewelry',
  },
];
