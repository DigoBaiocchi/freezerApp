import { RequestHandler } from "express";
import { DatabaseQueries, type PostParams, type UpdateParams } from "../database/dbQueries";

const freezerQueries = new DatabaseQueries('freezer');

const getFreezers: RequestHandler = async (req, res) => {
    const response = await freezerQueries.getItems();
    
    return res.status(200).json({data: response});
};

const postFreezer: RequestHandler = async (req, res) => {
    const { name, description } = req.body as PostParams;
    
    const newData = await freezerQueries.postItem({ name, description });

    return res.status(201).json({ newData });
};

const updateFreezer: RequestHandler<{ id: number }> = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body as UpdateParams;
    const updatedData = { id, name, description };

    await freezerQueries.updateItem(updatedData);

    return res.status(200).json({ msg: `Freezer successfully updated`, updatedData });
};

const deleteFreezer: RequestHandler<{ id: number }> = async (req, res) => {
    const id = req.params.id;

    await freezerQueries.deleteItem(id);

    return res.status(200).json({ msg: `Freezer successfully deleted` })
};

export const freezerRouter = { getFreezers, postFreezer, updateFreezer, deleteFreezer };