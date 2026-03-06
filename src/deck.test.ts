/// <reference types="jest" />
import { createDeck } from './deck';

describe('createDeck', () => {
  it('should return 52 cards', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
  });

  it('should contain unique cards', () => {
    const deck = createDeck();
    const unique = new Set(deck.map(c => `${c.rank}${c.suit}`));
    expect(unique.size).toBe(52);
  });
});