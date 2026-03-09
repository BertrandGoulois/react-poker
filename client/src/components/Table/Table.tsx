import { useGameStore } from '../../store/gameStore';
import Card from '../Card/Card';
import * as styles from './Table.css.ts';

export default function Table() {
    const { players, communityCards, pot, currentPlayerIndex, fold, call, raise } = useGameStore();

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
                            <Card key={`${card.rank}${card.suit}`} card={card} faceDown={!player.isActive} />
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
                    <button onClick={() => fold()}>Fold</button>
                    <button onClick={() => call()}>Call</button>
                    <button onClick={() => raise(50)}>Raise 50</button>
                    <button onClick={() => raise(100)}>Raise 100</button>
                </div>
            </div>
        </div>
    );
}