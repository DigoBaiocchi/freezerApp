import { RequestHandler } from "express";
import { NonInventoryQueries, type NonInventoryData, type IndividualTables } from "../database/nonInventoryDbQueries";
import { InventoryQueries, type DetailedInventoryData } from "../database/inventoryDbQueries";
import { AllTableNames } from "./successfulMiddlewares";

const missingRequiredParam = (tableName: AllTableNames): RequestHandler => {
    return async (req, res, next) => {
        if (!req.body.name || req.body.name === '') {
            return res.status(400).json({ error: "No name provided" });
        }

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
                const freezerDatabase = new NonInventoryQueries('freezer');
                const freezerData = await freezerDatabase.getData() as NonInventoryData[];
                checkFreezerId = freezerData.map(freezer => freezer.id).includes(updatedFreezerId);
                console.log('freezer id', updatedFreezerId, checkFreezerId)
                
                const categoryDatabase = new NonInventoryQueries('category');
                const categoryData = await categoryDatabase.getData() as NonInventoryData[];
                checkCategoryId = categoryData.map(category => category.id).includes(updatedCategoryId);
                console.log('category id', updatedCategoryId, checkCategoryId)
                
                const itemDatabase = new NonInventoryQueries('item');
                const itemData = await itemDatabase.getData() as NonInventoryData[];
                checkItemId = itemData.map(category => category.id).includes(updatedItemId);
                console.log('category id', updatedItemId, checkItemId)
                
                const unitDatabase = new NonInventoryQueries('unit');
                const unitData = await unitDatabase.getData() as NonInventoryData[];
                checkUnitId = unitData.map(category => category.id).includes(updatedUnitId);
                console.log('category id', updatedUnitId, checkUnitId)
            }

            if(!checkFreezerId || !checkCategoryId || !checkItemId || !checkUnitId) {
                return res.status(404).json({ error: "Incorrect item params provided" });
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

