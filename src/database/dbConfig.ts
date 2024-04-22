import { config } from '../utils/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: config.DATABASE_URL
});

export async function query<T>(text: string, params?: Array<T>, callback?: () => void) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (res) {
        console.log('executed query', { text, duration, rows: res.rowCount});
        return res;
    } else {
        console.log('something went wrong!');
    }
};