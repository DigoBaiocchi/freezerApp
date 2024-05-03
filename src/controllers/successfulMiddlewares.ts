import { RequestHandler } from "express";
import { DatabaseQueries, type PostParams, type DatabaseParams, TableName } from "../database/dbQueries";
import { FreezerCategoryQueries } from "../database/freezerCategoryDbQueries";
import { ItemQueries } from "../database/itemDbQueries";

const getDataByTableName = (tableName: TableName): RequestHandler => {
    return async (req, res) => {
        let response;
        if (tableName === 'freezer' || tableName === 'category') {
            const freezerCategoryDb = new FreezerCategoryQueries(tableName);
            response = freezerCategoryDb.getData();
        } else if (tableName === 'item') {
            const itemDb = new ItemQueries();
            response = itemDb.getData();
        } else {
            throw new Error("Incorrect table name selected");
        }
        
        return res.status(200).json({data: response});
    };
};

const postDataByTableName = (tableName: TableName): RequestHandler => {
    return async (req, res) => {
        const { name, description } = req.body as PostParams;
        let newData;
        
        if (tableName === 'freezer' || tableName === 'category') {
            // const database = new DatabaseQueries(tableName);
            const addedData = { name, description };
            const freezerCategoryDb = new FreezerCategoryQueries(tableName);
            newData = await freezerCategoryDb.postData(addedData);
        } else if (tableName === 'item') {
            const addedData = {
                name,
                description,
                freezerId: req.body.freezerId,
                categoryId: req.body.categoryId,
                units: req.body.units,
                expDate: req.body.expDate,
            };
            const itemDb = new ItemQueries();
            newData = await itemDb.postData(addedData);
        } else {
            throw new Error("Incorrect table name selected");
        }
    
        return res.status(201).json({ newData });
    };
};

const updateDataByTableName = (tableName: TableName): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const database = new DatabaseQueries(tableName);
        const id = req.params.id;
        const { name, description } = req.body as DatabaseParams;
        let updatedData:DatabaseParams;

        if (tableName === 'freezer' || tableName === 'category') {
            updatedData = { id, name, description };
        } else if (tableName === 'item') {
            updatedData = {
                id,
                name,
                description,
                freezerId: req.body.freezerId,
                categoryId: req.body.categoryId,
                units: req.body.units,
                expDate: req.body.expDate,
            };
        } else {
            throw new Error("Incorrect table name selected");
        }

        await database.updateItem(updatedData);
    
        return res.status(200).json({ msg: `${tableName} successfully updated`, updatedData });
    };
} 

const updateItemQuantity = (): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const database = new DatabaseQueries('item');
        const id = req.params.id;

    };
}

const deleteDataByTableName = (tableName: TableName): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const id = req.params.id;
        const database = new DatabaseQueries(tableName);

        await database.deleteItem(id);
    
        return res.status(200).json({ msg: `${tableName} successfully deleted` })
    };
} 

export const successfulMiddlewares = { 
    getDataByTableName, 
    postDataByTableName, 
    updateDataByTableName, 
    deleteDataByTableName,
};