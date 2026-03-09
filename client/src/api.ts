const BASE_URL = 'http://localhost:3001/api';

export async function fetchPlayers() {
  const res = await fetch(`${BASE_URL}/players`);
  return res.json();
}

export async function startGame(playerNames: string[]) {
  const res = await fetch(`${BASE_URL}/game/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerNames }),
  });
  return res.json();
}