import type { Card as CardType } from '../../types';
import Card from '../Card/Card';

interface Props {
  cards: CardType[];
}

export default function Deck({ cards }: Props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px' }}>
      {cards.map(card => (
        <Card key={`${card.rank}${card.suit}`} card={card} />
      ))}
    </div>
  );
}