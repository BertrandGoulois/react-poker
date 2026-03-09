import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/players', async (req, res) => {
    const result = await pool.query('SELECT * FROM players');
    res.json(result.rows);
});

router.post('/game/start', async (req, res) => {
    const { playerNames } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const players = await Promise.all(
            playerNames.map((name: string) =>
                client.query(
                    'INSERT INTO players (name, chips) VALUES ($1, $2) RETURNING *',
                    [name, 1000]
                )
            )
        );

        const game = await client.query(
            'INSERT INTO games (pot, phase) VALUES ($1, $2) RETURNING *',
            [0, 'preflop']
        );

        await client.query('COMMIT');

        res.json({
            game: game.rows[0],
            players: players.map(p => p.rows[0]),
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: 'Erreur lors du démarrage de la partie' });
    } finally {
        client.release();
    }
});

router.post('/game/:gameId/action', async (req, res) => {
    const { gameId } = req.params;
    const { playerId, action, amount } = req.body;

    const result = await pool.query(
        'INSERT INTO transactions (game_id, player_id, action, amount) VALUES ($1, $2, $3, $4) RETURNING *',
        [gameId, playerId, action, amount ?? 0]
    );

    res.json(result.rows[0]);
});

export default router;