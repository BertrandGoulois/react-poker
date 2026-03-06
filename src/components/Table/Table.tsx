import { useGameStore } from '../../store/gameStore';

export default function Table() {
  const { players, pot } = useGameStore();

  return (
    <div>
      <h2>Pot : {pot}</h2>
      <div>
        {players.map(player => (
          <div key={player.id}>
            <h3>{player.name} — {player.chips} chips</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {player.hand.map(card => (
                <div key={`${card.rank}${card.suit}`}>
                  {card.rank}{card.suit}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}