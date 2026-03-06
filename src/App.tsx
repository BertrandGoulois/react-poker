import { createDeck, shuffleDeck } from './deck';
import Card from './components/Card/Card';

const deck = shuffleDeck(createDeck());

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px' }}>
      {deck.map(card => (
        <Card key={`${card.rank}${card.suit}`} card={card} />
      ))}
    </div>
  );
}