import { RequestHandler } from "express";
import { NonInventoryQueries, type IndividualTables, type NonInventoryData } from "../database/nonInventoryDbQueries";
import { type DetailedInventoryData, type InventoryPostParams, InventoryQueries } from "../database/inventoryDbQueries";

export type AllTableNames = IndividualTables | 'inventory';

const getDataByTableName = (tableName: AllTableNames): RequestHandler => {
    return async (req, res) => {
        let response;
        if (tableName === 'freezer' || tableName === 'category' || tableName === 'item' || tableName === 'unit') {
            const freezerCategoryDb = new NonInventoryQueries(tableName);
            response = await freezerCategoryDb.getData();
        } else if (tableName === 'inventory') {
            const itemDb = new InventoryQueries();
            response = await itemDb.getData();
        } else {
            throw new Error("Incorrect table name selected");
        }
        return res.status(200).json({data: response});
    };
};

const getCategorylistByFreezer = (): RequestHandler<{ freezerId: number }>  => {
    return async (req, res) => {
        const freezerId: number = req.params.freezerId;
        const inventoryDb = new InventoryQueries();
        const response = await inventoryDb.getCategorySummaryByFreezer(freezerId);
        console.log(freezerId)

        return res.status(200).json({ data: response });
    };
};

const postDataByTableName = (tableName: AllTableNames): RequestHandler => {
    return async (req, res) => {
        let newData;
        
        if (tableName === 'freezer' || tableName === 'category' || tableName === 'item' || tableName === 'unit') {
            const name: string = req.body.name;
            const addedData = name;
            const freezerCategoryDb = new NonInventoryQueries(tableName);
            newData = await freezerCategoryDb.postData(addedData);
        } else if (tableName === 'inventory') {
            const {
                freezerId,
                categoryId,
                itemId,
                unitId,
                quantity,
                entryDate,
                expDate,
                description,
            } = req.body as InventoryPostParams;

            const addedData = {
                freezerId,
                categoryId,
                itemId,
                unitId,
                quantity,
                entryDate,
                expDate,
                description,
            };
            const itemDb = new InventoryQueries();
            newData = await itemDb.postData(addedData);
        } else {
            throw new Error("Incorrect table name selected");
        }
    
        return res.status(201).json({ newData });
    };
};

const updateDataByTableName = (tableName: AllTableNames): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const id: number = req.params.id;
        let updatedData;
        
        if (tableName === 'freezer' || tableName === 'category' || tableName === 'item' || tableName === 'unit') {
            const name: string = req.body.name;
            const freezerCategoryDb = new NonInventoryQueries(tableName);
            
            updatedData = freezerCategoryDb.updateData({ id, name });
        } else if (tableName === 'inventory') {
            const {
                freezerId,
                categoryId,
                itemId,
                unitId,
                quantity,
                entryDate,
                expDate,
                description,
            } = req.body as InventoryPostParams;
            const itemDb = new InventoryQueries();
            updatedData = await itemDb.updateData({
                id,
                freezerId,
                categoryId,
                itemId,
                unitId,
                quantity,
                entryDate,
                expDate,
                description,
            }) ;
        } else {
            throw new Error("Incorrect table name selected");
        }
    
        return res.status(200).json({ msg: `${tableName} successfully updated`, updatedData });
    };
} 

const updateItemQuantity = (): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const database = new InventoryQueries();
        console.log(`Id: ${req.params.id} - updated quantity: ${req.body.quantity}`)
        const updatedItem = await database.updateItemUnits({ id: req.params.id, quantity: req.body.quantity });
        console.log(updatedItem)
        return res.status(200).json({ msg: `Item quantity updated successfully`, updatedItem });

    };
}

const deleteDataByTableName = (tableName: AllTableNames): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const id = req.params.id;
        
        if (tableName === 'freezer' || tableName === 'category' || tableName === 'item' || tableName === 'unit') {
            const database = new NonInventoryQueries(tableName);

            await database.deleteData(id);
        } else if (tableName === 'inventory') {
            console.log(tableName);
            const database = new InventoryQueries();

            await database.deleteData(id);
        } else {
            throw new Error("Incorrect table name selected");
        }

    
        return res.status(200).json({ msg: `${tableName} successfully deleted` })
    };
} 

export const successfulMiddlewares = { 
    getDataByTableName, 
    getCategorylistByFreezer,
    postDataByTableName, 
    updateDataByTableName, 
    deleteDataByTableName,
    updateItemQuantity,
};