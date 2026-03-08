export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface Player {
  id: string;
  name: string;
  chips: number;
  hand: Card[];
  isActive: boolean;
  currentRoundBet: number;
}

export interface GameState {
  players: Player[];
  deck: Card[];
  pot: number;
  currentBet: number;
  smallBlind: number;
  bigBlind: number;
  currentPlayerIndex: number;
  communityCards: Card[];
  phase: 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';
}