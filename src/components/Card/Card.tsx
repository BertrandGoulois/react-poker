import type { Card as CardType } from '../../types';
import * as styles from './Card.css.ts';

interface Props {
  card: CardType;
}

const RED_SUITS = ['♥', '♦'];

export default function Card({ card }: Props) {
  const isRed = RED_SUITS.includes(card.suit);

  return (
    <div className={`${styles.card} ${isRed ? styles.red : styles.black}`}>
      <div>{card.rank}<br />{card.suit}</div>
      <div className={styles.suit}>{card.suit}</div>
      <div className={styles.flipped}>{card.rank}<br />{card.suit}</div>
    </div>
  );
}