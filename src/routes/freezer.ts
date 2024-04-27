import { Router } from "express";
import { freezerRouter } from "../controllers/freezer";
import { incorrectId, missingName, notUniqueName } from "../controllers/errorMiddlewares";

const router:Router = Router();


router.get('/', freezerRouter.getFreezers);

router.post('/', missingName, notUniqueName('freezer'), freezerRouter.postFreezer);

router.put('/:id', incorrectId('freezer'), freezerRouter.updateFreezer);

router.delete('/:id', incorrectId('freezer'), freezerRouter.deleteFreezer);

export default router;