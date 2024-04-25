import { RequestHandler } from "express";
import { DatabaseQueries, PostParams } from "../database/dbQueries";

const itemQueries = new DatabaseQueries('item');

const getItems: RequestHandler = async (req, res) => {
    const response = await itemQueries.getItems();
    
    return res.status(200).json({data: response});
};

const postItem: RequestHandler = async (req, res) => {
    const postInfo: PostParams = {
        name: req.body.name,
        description: req.body.description,
        freezerId: req.body.freezerId,
        categoryId: req.body.categoriesId,
        itemTotal: req.body.itemTotal,
        expDate: req.body.expDatege,
    };
    
    await itemQueries.postItem(postInfo);

    return res.status(201).json(postInfo);
};

export const data = { getItems, postItem };