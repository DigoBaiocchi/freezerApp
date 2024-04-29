import { RequestHandler } from "express";
import { DatabaseQueries, type TableName } from "../database/dbQueries";

const missingRequiredParam = (tableName: TableName): RequestHandler => {
    return async (req, res, next) => {
        if (!req.body.name || req.body.name === '') {
            return res.status(400).json({ error: "No name provided" });
        }

        if (tableName === 'item') {
            const { freezerId, categoryId, units, expDate } = req.body;
            
            const updatedFreezerId: number = freezerId || 0;
            let checkFreezerId: boolean = !updatedFreezerId || true;
            const updatedCategoryId: number = categoryId || 0;
            let checkCategoryId: boolean = !updatedCategoryId || true;

            if (updatedFreezerId || updatedCategoryId) {
                const freezerDatabase = new DatabaseQueries('freezer');
                const freezerData = await freezerDatabase.getItems();
                checkFreezerId = freezerData.map(freezer => freezer.id).includes(updatedFreezerId);
                console.log('freezer id', updatedFreezerId, checkFreezerId)
                
                const categoryDatabase = new DatabaseQueries('category');
                const categoryData = await categoryDatabase.getItems();
                checkCategoryId = categoryData.map(category => category.id).includes(updatedCategoryId);
                console.log('category id', updatedCategoryId, checkCategoryId)
            }

            if(!checkFreezerId || !checkCategoryId) {
                return res.status(404).json({ error: "Incorrect item params provided" });
            }
        }
    
        next();
    };
} 

const notUniqueName = (tableName: TableName): RequestHandler => {
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

const incorrectId = (tableName: TableName): RequestHandler<{ id: number }> => {
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

export const errorMiddlewares = {
    missingRequiredParam,
    notUniqueName,
    incorrectId,
};

