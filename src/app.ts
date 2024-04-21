import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from 'body-parser';
import { config } from './utils/config';

import itemsRouter from './routes/items';

dotenv.config({ path: '.env.development.local' });

const app:Express = express();
const port = config.PORT;

app.use(json());

app.use('/items', itemsRouter);

app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
});

app.get('/', (req: Request, res: Response) => {
    res.send('FreezerApp');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});