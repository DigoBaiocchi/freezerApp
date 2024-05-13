import { RequestHandler } from "express";
import { NonInventoryQueries, type NonInventoryData, type IndividualTables } from "../database/nonInventoryDbQueries";
import { InventoryQueries, type DetailedInventoryData } from "../database/inventoryDbQueries";
import { AllTableNames } from "./successfulMiddlewares";
import { checkForMissingRequiredParams } from "../utils/utils";

const missingRequiredParam = (tableName: AllTableNames): RequestHandler => {
    return async (req, res, next) => {
        
        if (tableName === 'inventory') {
            const { freezerId, categoryId, itemId, unitId } = req.body;
            
            const updatedFreezerId: string = freezerId || 0;
            let checkFreezerId: boolean = !updatedFreezerId || true;
            const updatedCategoryId: string = categoryId || 0;
            let checkCategoryId: boolean = !updatedCategoryId || true;
            const updatedItemId: string = itemId || 0;
            let checkItemId: boolean = !updatedItemId || true;
            const updatedUnitId: string = unitId || 0;
            let checkUnitId: boolean = !updatedUnitId || true;
            
            if (updatedFreezerId || updatedCategoryId || checkItemId || checkUnitId) {
                checkFreezerId = await checkForMissingRequiredParams('freezer', updatedFreezerId);
                checkCategoryId = await checkForMissingRequiredParams('category', updatedCategoryId);
                checkItemId = await checkForMissingRequiredParams('item', updatedItemId);
                checkUnitId = await checkForMissingRequiredParams('unit', updatedUnitId);
            }
            
            if(!checkFreezerId || !checkCategoryId || !checkItemId || !checkUnitId) {
                return res.status(404).json({ error: "Incorrect item params provided" });
            }
        } else {
            if (!req.body.name || req.body.name === '') {
                console.log(tableName)
                return res.status(400).json({ error: "No name provided" });
            }
        }
        
        next();
    };
} 

const notUniqueName = (tableName: IndividualTables): RequestHandler => {
    return async (req, res, next) => {
        const database = new NonInventoryQueries(tableName);
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
            const database = new NonInventoryQueries(tableName);
            const data = await database.getData() as NonInventoryData[];
            checkIfIdExists = data.map(data => data.id).includes(req.params.id);
        } else if (tableName === 'inventory') {
            const database = new InventoryQueries();
            const data = await database.getData() as DetailedInventoryData[];
            checkIfIdExists = data.map(data => data.id).includes(req.params.id);
            console.log(checkIfIdExists, req.params.id)
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

