import { RequestHandler } from "express";
import { DatabaseParams, DatabaseQueries, freezerCategoryItemData, type TableName } from "../database/dbQueries";

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
                const freezerData = await freezerDatabase.getItems() as DatabaseParams[];
                checkFreezerId = freezerData.map(freezer => freezer.id).includes(updatedFreezerId);
                console.log('freezer id', updatedFreezerId, checkFreezerId)
                
                const categoryDatabase = new DatabaseQueries('category');
                const categoryData = await categoryDatabase.getItems() as DatabaseParams[];
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
        let checkIfNameExists: boolean;

        if (tableName === 'freezer' || tableName === 'category') {
            const data = await database.getItems() as DatabaseParams[];
            checkIfNameExists = data.map(data => data.name.toLowerCase()).includes(req.body.name.toLowerCase());
        } else if (tableName === 'item') {
            const data = await database.getItems() as freezerCategoryItemData[];
            checkIfNameExists = data.map(data => data.itemname.toLowerCase()).includes(req.body.name.toLowerCase());
        } else {
            throw new Error("Invalid table name");
        }
        
        if (checkIfNameExists) {
            return res.status(400).json({ error: "Name already exists" });
        }

        next();
    };
}

const incorrectId = (tableName: TableName): RequestHandler<{ id: number }> => {
    return async (req, res, next) => {
        const database = new DatabaseQueries(tableName);
        let checkIfIdExists: boolean;

        if (tableName === 'freezer' || tableName === 'category') {
            const data = await database.getItems() as DatabaseParams[];
            checkIfIdExists = data.map(data => data.id).includes(Number(req.params.id));
        } else if (tableName === 'item') {
            const data = await database.getItems() as freezerCategoryItemData[];
            checkIfIdExists = data.map(data => data.itemid).includes(Number(req.params.id));
        } else {
            throw new Error("Invalid table name");
        }
        
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

