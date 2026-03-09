import express from 'express';
import cors from 'cors';
import gameRouter from './routes/game';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', gameRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});