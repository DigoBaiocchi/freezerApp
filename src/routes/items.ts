import express, { RequestHandler, Router, type Request, type Response } from "express";
import { data } from "../controllers/items";

const router:Router = Router();

router.get('/', data.getItems);

router.post('/', data.postItem);

router.put('/:id');

router.delete('/:id');

export default router;