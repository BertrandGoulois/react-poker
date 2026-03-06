import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import Table from './components/Table/Table';

export default function App() {
  const { initGame, dealCards } = useGameStore();

  useEffect(() => {
    initGame(['Alice', 'Bob', 'Charlie']);
    dealCards();
  }, []);

  return <Table />;
}