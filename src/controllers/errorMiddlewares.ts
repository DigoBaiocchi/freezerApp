import { RequestHandler } from "express";
import { FreezerCategoryQueries, type NonInventoryData, type IndividualTables } from "../database/nonInventoryDbQueries";
import { ItemQueries, type DetailedInventoryData } from "../database/inventoryDbQueries";
import { AllTableNames } from "./successfulMiddlewares";

const missingRequiredParam = (tableName: AllTableNames): RequestHandler => {
    return async (req, res, next) => {
        if (!req.body.name || req.body.name === '') {
            return res.status(400).json({ error: "No name provided" });
        }

        if (tableName === 'inventory') {
            const { freezerId, categoryId, units, expDate } = req.body;
            
            const updatedFreezerId: string = freezerId || 0;
            let checkFreezerId: boolean = !updatedFreezerId || true;
            const updatedCategoryId: string = categoryId || 0;
            let checkCategoryId: boolean = !updatedCategoryId || true;

            if (updatedFreezerId || updatedCategoryId) {
                const freezerDatabase = new FreezerCategoryQueries('freezer');
                const freezerData = await freezerDatabase.getData() as NonInventoryData[];
                checkFreezerId = freezerData.map(freezer => freezer.id).includes(updatedFreezerId);
                console.log('freezer id', updatedFreezerId, checkFreezerId)
                
                const categoryDatabase = new FreezerCategoryQueries('category');
                const categoryData = await categoryDatabase.getData() as NonInventoryData[];
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

const notUniqueName = (tableName: IndividualTables): RequestHandler => {
    return async (req, res, next) => {
        const database = new FreezerCategoryQueries(tableName);
        let checkIfNameExists: boolean;

        if (tableName === 'freezer' || tableName === 'category' || tableName === 'item' || tableName === 'unit') {
            const data = await database.getData() as NonInventoryData[];
            checkIfNameExists = data.map(data => data.name.toLowerCase()).includes(req.body.name.toLowerCase());
        } else {
            throw new Error("Invalid table name");
        }
        
        if (checkIfNameExists) {
            return res.status(400).json({ error: "Name already exists" });
        }

        next();
    };
}

const incorrectId = (tableName: AllTableNames): RequestHandler<{ id: string }> => {
    return async (req, res, next) => {
        let checkIfIdExists: boolean;

        if (tableName === 'freezer' || tableName === 'category' || tableName === 'item' || tableName === 'unit') {
            const database = new FreezerCategoryQueries(tableName);
            const data = await database.getData() as NonInventoryData[];
            checkIfIdExists = data.map(data => data.id).includes(req.params.id);
        } else if (tableName === 'inventory') {
            const database = new ItemQueries();
            const data = await database.getData() as DetailedInventoryData[];
            checkIfIdExists = data.map(data => data.itemid).includes(req.params.id);
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

