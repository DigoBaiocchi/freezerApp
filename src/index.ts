import express, { Express, Request, Response } from "express";
const dotenv = require('dotenv');

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('FreezerApp');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});