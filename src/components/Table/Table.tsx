import { useGameStore } from '../../store/gameStore';
import Card from '../Card/Card';
import * as styles from './Table.css.ts';

export default function Table() {
  const { players, communityCards, pot } = useGameStore();

  const playerPositions = [styles.playerTopLeft, styles.playerTopRight, styles.playerBottom];

  return (
    <div className={styles.table}>
      {players.map((player, i) => (
        <div key={player.id} className={playerPositions[i]}>
          <p className={styles.playerName}>{player.name} — {player.chips} chips</p>
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
      </div>
    </div>
  );
}