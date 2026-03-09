import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'react_poker',
  user: 'postgres',
  password: 'root',
});

export default pool;