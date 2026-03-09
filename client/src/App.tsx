import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import Table from './components/Table/Table';

const PLAYER_NAMES = ['Alice', 'Bob', 'Charlie'];

async function startGame(playerNames: string[]) {
  const res = await fetch('http://localhost:3001/api/game/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerNames }),
  });
  if (!res.ok) throw new Error('Erreur démarrage partie');
  return res.json();
}

export default function App() {
  const { initAndDeal, setGameId, setDbPlayerIds } = useGameStore();

  const { mutate } = useMutation({
    mutationFn: startGame,
    onSuccess: (data) => { setGameId(data.game.id); setDbPlayerIds(data.players); },
    onError: (err) => console.error('API non dispo:', err),
  });

  useEffect(() => {
    initAndDeal(PLAYER_NAMES);
    mutate(PLAYER_NAMES);
  }, []);

  return <Table />;
}