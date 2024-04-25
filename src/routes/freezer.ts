import { Router } from "express";
import { freezerRouter } from "../controllers/freezer";

const router:Router = Router();

router.get('/', freezerRouter.getFreezers);

router.post('/', freezerRouter.postFreezer);

router.put('/:id', freezerRouter.updateFreezer);

router.delete('/:id', freezerRouter.deleteFreezer);

export default router;