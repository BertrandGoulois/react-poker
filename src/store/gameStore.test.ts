/// <reference types="vitest/globals" />
import { useGameStore } from './gameStore';

describe('initAndDeal', () => {
    beforeEach(() => {
        useGameStore.getState().initAndDeal(['Alice', 'Bob', 'Charlie']);
    });

    it('should create 3 players with correct names', () => {
        const { players } = useGameStore.getState();
        expect(players).toHaveLength(3);
        expect(players.map(p => p.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should deal 2 cards to each player', () => {
        const { players } = useGameStore.getState();
        players.forEach(p => expect(p.hand).toHaveLength(2));
    });

    it('should deal unique cards — no duplicates across hands', () => {
        const { players } = useGameStore.getState();
        const allCards = players.flatMap(p => p.hand.map(c => `${c.rank}${c.suit}`));
        const unique = new Set(allCards);
        expect(unique.size).toBe(allCards.length);
    });

    it('should leave 46 cards in the deck after dealing', () => {
        const { deck } = useGameStore.getState();
        expect(deck).toHaveLength(46);
    });

    it('should start with pot equal to small blind + big blind', () => {
        expect(useGameStore.getState().pot).toBe(30);
    });

    it('should deduct small blind from player 0', () => {
        expect(useGameStore.getState().players[0].chips).toBe(990);
    });

    it('should deduct big blind from player 1', () => {
        expect(useGameStore.getState().players[1].chips).toBe(980);
    });

    it('should set currentRoundBet for blinds', () => {
        const { players } = useGameStore.getState();
        expect(players[0].currentRoundBet).toBe(10);
        expect(players[1].currentRoundBet).toBe(20);
        expect(players[2].currentRoundBet).toBe(0);
    });

    it('should set all players as active', () => {
        const { players } = useGameStore.getState();
        players.forEach(p => expect(p.isActive).toBe(true));
    });

    it('should set currentBet to big blind', () => {
        expect(useGameStore.getState().currentBet).toBe(20);
    });

    it('should start at preflop phase', () => {
        expect(useGameStore.getState().phase).toBe('preflop');
    });
});

describe('fold', () => {
    beforeEach(() => {
        useGameStore.getState().initAndDeal(['Alice', 'Bob', 'Charlie']);
    });

    it('should set player as inactive', () => {
        useGameStore.getState().fold();
        expect(useGameStore.getState().players[2].isActive).toBe(false);
    });

    it('should empty the current player hand', () => {
        useGameStore.getState().fold();
        expect(useGameStore.getState().players[2].hand).toHaveLength(0);
    });

    it('should skip folded player in rotation', () => {
        useGameStore.getState().fold();
        expect(useGameStore.getState().currentPlayerIndex).toBe(0);
        useGameStore.getState().fold();
        expect(useGameStore.getState().currentPlayerIndex).toBe(1);
    });
});

describe('raise', () => {
    beforeEach(() => {
        useGameStore.getState().initAndDeal(['Alice', 'Bob', 'Charlie']);
    });

    it('should deduct chips from current player', () => {
        useGameStore.getState().raise(100);
        expect(useGameStore.getState().players[2].chips).toBe(900);
    });

    it('should update currentRoundBet', () => {
        useGameStore.getState().raise(100);
        expect(useGameStore.getState().players[2].currentRoundBet).toBe(100);
    });

    it('should set hasActed to true', () => {
        useGameStore.getState().raise(100);
        expect(useGameStore.getState().players[2].hasActed).toBe(true);
    });

    it('should add amount to pot', () => {
        useGameStore.getState().raise(100);
        expect(useGameStore.getState().pot).toBe(130);
    });

    it('should update currentBet', () => {
        useGameStore.getState().raise(100);
        expect(useGameStore.getState().currentBet).toBe(120);
    });
});

describe('call', () => {
    beforeEach(() => {
        useGameStore.getState().initAndDeal(['Alice', 'Bob', 'Charlie']);
        useGameStore.getState().raise(100); // Charlie raise
    });

    it('should deduct correct amount from next player', () => {
        useGameStore.getState().call(); // Alice call — doit égaler 120, a déjà misé 10 → paie 110
        expect(useGameStore.getState().players[0].chips).toBe(880);
    });

    it('should add call amount to pot', () => {
        useGameStore.getState().call();
        expect(useGameStore.getState().pot).toBe(240);
    });

    it('should update currentRoundBet', () => {
        useGameStore.getState().call();
        expect(useGameStore.getState().players[0].currentRoundBet).toBe(120);
    });

    it('should set hasActed to true', () => {
        useGameStore.getState().call();
        expect(useGameStore.getState().players[0].hasActed).toBe(true);
    });
});
