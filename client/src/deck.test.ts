/// <reference types="vitest/globals" />

import { createDeck, shuffleDeck } from './deck';

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

describe('shuffleDeck', () => {
  it('should still contain 52 cards after shuffle', () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    expect(shuffled).toHaveLength(52);
  });

  it('should not be in the same order as the original', () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    const isSameOrder = deck.every((card, i) => card.rank === shuffled[i].rank && card.suit === shuffled[i].suit);
    expect(isSameOrder).toBe(false);
  });
});