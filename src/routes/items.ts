import express, { RequestHandler, Router, type Request, type Response } from "express";
import { data } from "../controllers/items";

const router:Router = Router();

router.get('/', data.getItem);
router.post('/', data.postItem);

export default router;