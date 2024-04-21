import express, { RequestHandler, Router, type Request, type Response } from "express";
import { getRouter } from "../controllers/items";

const router:Router = Router();

router.get('/', getRouter);

export default router;