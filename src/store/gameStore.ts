import { create } from 'zustand';
import type { GameState, Player } from '../types';
import { createDeck, shuffleDeck } from '../deck';

interface GameStore extends GameState {
    initGame: (playerNames: string[]) => void;
    dealCards: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    players: [],
    deck: [],
    pot: 0,
    currentPlayerIndex: 0,
    communityCards: [],
    phase: 'preflop',

    initGame: (playerNames: string[]) => {
        const deck = shuffleDeck(createDeck());
        const players: Player[] = playerNames.map((name, i) => ({
            id: `player-${i}`,
            name,
            chips: 1000,
            hand: [],
        }));

        set({ players, deck, pot: 0, currentPlayerIndex: 0, communityCards: [], phase: 'preflop' });
    },
    dealCards: () => {
        set((state) => {
            const deck = [...state.deck];

            const players = state.players.map((player) => ({
                ...player,
                hand: [deck.pop()!],
            }));

            const playersWithFullHand = players.map((player) => ({
                ...player,
                hand: [...player.hand, deck.pop()!],
            }));

            return { players: playersWithFullHand, deck };
        });
    },
}));