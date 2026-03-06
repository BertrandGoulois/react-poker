import { createDeck, shuffleDeck } from './deck';
import Deck from './components/Deck/Deck';

const deck = shuffleDeck(createDeck());

export default function App() {
  return <Deck cards={deck} />;
}