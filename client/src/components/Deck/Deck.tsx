import type { Card as CardType } from '../../types';
import Card from '../Card/Card';
import * as styles from './Deck.css.ts';

interface Props {
  cards: CardType[];
}

export default function Deck({ cards }: Props) {
  return (
    <div className={styles.deck}>
      {cards.map(card => (
        <Card key={`${card.rank}${card.suit}`} card={card} />
      ))}
    </div>
  );
}