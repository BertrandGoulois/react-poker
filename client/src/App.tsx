import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import Table from './components/Table/Table';

export default function App() {
  const { initAndDeal } = useGameStore();

  useEffect(() => {
    initAndDeal(['Alice', 'Bob', 'Charlie']);
  }, []);

  return <Table />;
}