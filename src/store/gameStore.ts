import { create } from 'zustand';
import type { GameState, Player } from '../types';
import { createDeck, shuffleDeck } from '../deck';

interface GameStore extends GameState {
    initAndDeal: (playerNames: string[]) => void;
    fold: () => void;
    call: () => void;
    raise: (amount: number) => void;
    nextPhase: () => void;
}

function nextActiveIndex(players: Player[], current: number): number {
    const total = players.length;
    let next = (current + 1) % total;
    while (!players[next].isActive) {
        next = (next + 1) % total;
    }
    return next;
}

function isTourTermine(players: Player[], currentBet: number): boolean {
    return players
        .filter(p => p.isActive)
        .every(p => p.hasActed && p.currentRoundBet === currentBet);
}

export const useGameStore = create<GameStore>((set, get) => ({
    players: [],
    deck: [],
    pot: 0,
    currentBet: 0,
    smallBlind: 10,
    bigBlind: 20,
    currentPlayerIndex: 0,
    communityCards: [],
    phase: 'preflop',

    initAndDeal: (playerNames: string[]) => {
        const deck = shuffleDeck(createDeck());
        const players: Player[] = playerNames.map((name, i) => ({
            id: `player-${i}`,
            name,
            chips: 1000,
            hand: [],
            isActive: true,
            currentRoundBet: 0,
            hasActed: false,
        }));

        const firstRound = deck.splice(0, players.length);
        const secondRound = deck.splice(0, players.length);

        const playersWithHands = players.map((p, i) => ({
            ...p,
            hand: [firstRound[i], secondRound[i]],
        }));

        playersWithHands[0].chips -= 10;
        playersWithHands[0].currentRoundBet = 10;
        playersWithHands[0].hasActed = true;
        playersWithHands[1].chips -= 20;
        playersWithHands[1].currentRoundBet = 20;
        playersWithHands[1].hasActed = true;

        set({
            players: playersWithHands,
            deck,
            pot: 30,
            currentBet: 20,
            smallBlind: 10,
            bigBlind: 20,
            currentPlayerIndex: 2,
            communityCards: [],
            phase: 'preflop',
        });
    },

    fold: () => {
        set((state) => {
            const players = state.players.map((p, i) =>
                i === state.currentPlayerIndex
                    ? { ...p, hand: [], isActive: false }
                    : p
            );
            const next = nextActiveIndex(players, state.currentPlayerIndex);
            return { players, currentPlayerIndex: next };
        });
    },

    call: () => {
        set((state) => {
            const currentPlayer = state.players[state.currentPlayerIndex];
            const callAmount = Math.min(currentPlayer.chips, state.currentBet - currentPlayer.currentRoundBet);
            const players = state.players.map((p, i) =>
                i === state.currentPlayerIndex
                    ? { ...p, chips: p.chips - callAmount, currentRoundBet: p.currentRoundBet + callAmount, hasActed: true }
                    : p
            );
            const pot = state.pot + callAmount;
            const next = nextActiveIndex(players, state.currentPlayerIndex);
            return { players, pot, currentPlayerIndex: next };
        });
        if (isTourTermine(get().players, get().currentBet)) get().nextPhase();
    },

    raise: (amount: number) => {
        set((state) => {
            const players = state.players.map((p, i) =>
                i === state.currentPlayerIndex
                    ? { ...p, chips: p.chips - amount, currentRoundBet: p.currentRoundBet + amount, hasActed: true }
                    : p
            );
            const next = nextActiveIndex(players, state.currentPlayerIndex);
            return { players, pot: state.pot + amount, currentBet: state.currentBet + amount, currentPlayerIndex: next };
        });
        if (isTourTermine(get().players, get().currentBet)) get().nextPhase();
    },

    nextPhase: () => {
        set((state) => {
            const phases: GameState['phase'][] = ['preflop', 'flop', 'turn', 'river', 'showdown'];
            const currentIndex = phases.indexOf(state.phase);
            const nextPhase = phases[currentIndex + 1] ?? 'showdown';

            const players = state.players.map(p => ({ ...p, currentRoundBet: 0, hasActed: false }));

            const deck = [...state.deck];
            let newCommunityCards = [...state.communityCards];

            if (nextPhase === 'flop') newCommunityCards = [...newCommunityCards, deck.pop()!, deck.pop()!, deck.pop()!];
            if (nextPhase === 'turn') newCommunityCards = [...newCommunityCards, deck.pop()!];
            if (nextPhase === 'river') newCommunityCards = [...newCommunityCards, deck.pop()!];

            return { phase: nextPhase, players, deck, communityCards: newCommunityCards, currentBet: 0, currentPlayerIndex: 0 };
        });
    },
}));