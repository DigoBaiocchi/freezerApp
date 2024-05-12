import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from 'body-parser';
import { config } from './utils/config';

import freezerRouter from './routes/freezer';
import categoryRouter from './routes/category';
import itemsRouter from './routes/item';
import unitRouter from './routes/unit';
import inventoryRouter from './routes/inventory';
import { CreateDatabaseTables } from "./database/createTablesQueries";

dotenv.config({ path: '.env.development.local' });

export const app:Express = express();
const port = config.PORT;

app.use(json());

app.use('/freezer', freezerRouter);
app.use('/category', categoryRouter);
app.use('/item', itemsRouter);
app.use('/unit', unitRouter);
app.use('/inventory', inventoryRouter);

app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
});

app.get('/', (req: Request, res: Response) => {
    const createDatabase = new CreateDatabaseTables();
    createDatabase.createTables();
    res.send('FreezerApp');
});

export const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});