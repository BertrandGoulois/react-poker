import type { Card as CardType } from '../../types';

interface Props {
  card: CardType;
}

const RED_SUITS = ['♥', '♦'];

export default function Card({ card }: Props) {
  const isRed = RED_SUITS.includes(card.suit);
  const color = isRed ? 'red' : 'black';

  return (
    <div style={{ color, width: '80px', height: '120px', border: '1px solid #ccc', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'white', fontFamily: 'serif', fontSize: '16px' }}>
      <div>{card.rank}<br />{card.suit}</div>
      <div style={{ textAlign: 'center', fontSize: '24px' }}>{card.suit}</div>
      <div style={{ transform: 'rotate(180deg)' }}>{card.rank}<br />{card.suit}</div>
    </div>
  );
}