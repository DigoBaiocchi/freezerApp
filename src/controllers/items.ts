import { RequestHandler } from "express";
import { DatabaseQueries, PostProps } from "../database/dbQueries";

const itemQueries = new DatabaseQueries('item');

const getItem: RequestHandler = async (req, res) => {
    const response = await itemQueries.getItems();
    
    return res.status(200).json({data: response});
};

const postItem: RequestHandler = async (req, res) => {
    const postInfo: PostProps = {
        name: 'Another item 2',
        description: '',
        freezerId: 1,
        categoryId: 1,
        itemTotal: 5,
        expDate: new Date()
    };
    
    await itemQueries.postItem(postInfo);

    return res.status(201).json(postInfo);
};

export const data = { getItem, postItem };