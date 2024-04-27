import { RequestHandler } from "express";
import { DatabaseQueries, type TableName } from "../database/dbQueries";

export const missingName: RequestHandler = (req, res, next) => {
    if (!req.body.name || req.body.name === '') {
        return res.status(400).json({ error: "No name provided" });
    }

    next();
};

export const notUniqueName = (tableName: TableName): RequestHandler => {
    return async (req, res, next) => {
        const database = new DatabaseQueries(tableName);
        const items = await database.getItems();
        const checkIfNameExists = items.map(data => data.name.toLowerCase()).includes(req.body.name.toLowerCase());
        
        if (checkIfNameExists) {
            return res.status(400).json({ error: "Name already exists" });
        }

        next();
    };
}

export const incorrectId = (tableName: TableName): RequestHandler<{ id: number }> => {
    return async (req, res, next) => {
        const database = new DatabaseQueries(tableName);
        const items = await database.getItems();
        const checkIfIdExists = items.map(data => data.id).includes(Number(req.params.id));
        
        if (!checkIfIdExists) {
            return res.status(400).json({ error: "Id param does not exist" });
        }

        next();
    };
}

