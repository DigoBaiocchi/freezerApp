import { config } from '../utils/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: config.DATABASE_URL
});

const query = async (text: string, params: string[], callback: () => void) => {
    const start = Date.now();
    const res: Promise<> = await pool.query(text, params, callback);
    const duration = Date.now() - start;
    if (res) {
        console.log('executed query', { text, duration, rows: res.rowCount});
        return res;
    } else {
        console.log('something went wrong!');
    }
};

module.exports = { query };