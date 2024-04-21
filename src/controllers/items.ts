import { RequestHandler } from "express";

export const getRouter: RequestHandler = (req, res) => {
    res.json("This is the item get router");
}