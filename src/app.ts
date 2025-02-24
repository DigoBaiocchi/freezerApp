import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser, { json } from 'body-parser';
import session from 'express-session'; 
import cors from 'cors';
import { config } from './utils/config';

import freezerRouter from './routes/freezer';
import categoryRouter from './routes/category';
import itemsRouter from './routes/item';
import unitRouter from './routes/unit';
import locationRouter from './routes/location';
import inventoryRouter from './routes/inventory';
import { DatabaseSchema } from "./database/createTablesQueries";

// dotenv.config({ path: '.env.development.local' });

export const app:Express = express();
const port = config.PORT;

app.use(json());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true,
}));

app.use(
    session ({
        secret: "secret-key",
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24,
            secure: false
        },
        resave: false,
        saveUninitialized: false,
    })
);

app.use('/freezer', freezerRouter);
app.use('/category', categoryRouter);
app.use('/item', itemsRouter);
app.use('/unit', unitRouter);
app.use('/location', locationRouter);
app.use('/inventory', inventoryRouter);

app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
});

app.get('/', (req: Request, res: Response) => {
    console.log("Test test")
    res.send('FreezerApp');
});

export const server = app.listen(port, () => {
    const createDatabase = new DatabaseSchema();
    createDatabase.applyDatabaseSchemaChanges();
    
    console.log(`Server running on port: ${port}`);
});