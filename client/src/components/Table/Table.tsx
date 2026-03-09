import { useMutation } from '@tanstack/react-query';
import { useGameStore } from '../../store/gameStore';
import Card from '../Card/Card';
import * as styles from './Table.css.ts';

async function postAction(payload: {
    gameId: string;
    playerId: string;
    action: string;
    amount?: number;
}) {
    const res = await fetch(`http://localhost:3001/api/game/${payload.gameId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erreur action');
    return res.json();
}

export default function Table() {
    const {
        players, communityCards, pot, currentPlayerIndex,
        fold, call, raise, gameId, currentBet,
    } = useGameStore();

    const { mutate: persistAction } = useMutation({
        mutationFn: postAction,
        onError: (err) => console.error('Action non persistée:', err),
    });

    const currentPlayer = players[currentPlayerIndex];

    function handleFold() {
        fold();
        if (gameId && currentPlayer) {
            persistAction({ gameId, playerId: currentPlayer.id, action: 'fold' });
        }
    }

    function handleCall() {
        const callAmount = Math.min(
            currentPlayer.chips,
            currentBet - currentPlayer.currentRoundBet
        );

        call();
        if (gameId && currentPlayer) {
            persistAction({ gameId, playerId: currentPlayer.id, action: 'call', amount: callAmount });
        }
    }

    function handleRaise(amount: number) {
        raise(amount);
        if (gameId && currentPlayer) {
            persistAction({ gameId, playerId: currentPlayer.id, action: 'raise', amount });
        }
    }

    const playerPositions = [styles.playerTopLeft, styles.playerTopRight, styles.playerBottom];

    return (
        <div className={styles.table}>
            {players.map((player, i) => (
                <div key={player.id} className={playerPositions[i]}>
                    <p className={styles.playerName}>
                        {player.name} - {player.chips} chips
                        {!player.isActive ? ' 💀' : i === currentPlayerIndex ? ' 👈' : ''}
                    </p>
                    <div className={styles.hand}>
                        {player.hand.map(card => (
                            <Card key={`${card.rank}${card.suit}`} card={card} />
                        ))}
                    </div>
                </div>
            ))}

            <div className={styles.feltTable}>
                <div className={styles.communityCards}>
                    {communityCards.map(card => (
                        <Card key={`${card.rank}${card.suit}`} card={card} />
                    ))}
                </div>
                <p className={styles.pot}>Pot : {pot}</p>

                <div>
                    <button onClick={handleFold}>Fold</button>
                    <button onClick={handleCall}>Call</button>
                    <button onClick={() => handleRaise(50)}>Raise 50</button>
                    <button onClick={() => handleRaise(100)}>Raise 100</button>
                </div>
            </div>
        </div>
    );
}