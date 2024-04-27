import { RequestHandler } from "express";
import { DatabaseQueries, type PostParams, type DatabaseParams, TableName } from "../database/dbQueries";

const getDataByTableName = (tableName: TableName): RequestHandler => {
    return async (req, res) => {
        const database = new DatabaseQueries(tableName);
        const response = await database.getItems();
        
        return res.status(200).json({data: response});
    };
};

const postDataByTableName = (tableName: TableName): RequestHandler => {
    return async (req, res) => {
        const { name, description } = req.body as PostParams;
        const database = new DatabaseQueries(tableName);
        let addedData: PostParams;

        if (tableName === 'freezer' || tableName === 'category') {
            addedData = { name, description };
        } else if (tableName === 'item') {
            addedData = {
                name,
                description,
                freezerId: req.body.freezerId,
                categoryId: req.body.categoriesId,
                itemTotal: req.body.itemTotal,
                expDate: req.body.expDatege,
            };
        } else {
            throw new Error("Incorrect table name selected");
        }

        const newData = await database.postItem(addedData);
    
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
                units: req.body.units,
                expDate: req.body.expDate,
            };
        } else {
            throw new Error("Incorrect table name selected");
        }

        await database.updateItem(updatedData);
    
        return res.status(200).json({ msg: `Freezer successfully updated`, updatedData });
    };
} 

const deleteDataByTableName = (tableName: TableName): RequestHandler<{ id: number }> => {
    return async (req, res) => {
        const id = req.params.id;
        const database = new DatabaseQueries(tableName);

        await database.deleteItem(id);
    
        return res.status(200).json({ msg: `Freezer successfully deleted` })
    };
} 

export const successfulMiddlewares = { 
    getDataByTableName, 
    postDataByTableName, 
    updateDataByTableName, 
    deleteDataByTableName,
};