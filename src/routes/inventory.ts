import { Router } from "express";
import { successfulMiddlewares } from "../controllers/successfulMiddlewares";
import { errorMiddlewares } from "../controllers/errorMiddlewares";

const router:Router = Router();
const tableName = "inventory";

router.get('/', 
    successfulMiddlewares.getDataByTableName(tableName)
);

router.get('/category-list/:freezerId',
    successfulMiddlewares.getCategorylistByFreezer()
);

router.get('/item-list/:freezerId/:categoryId',
    successfulMiddlewares.getItemlistByFreezerAndCategory()
);

router.get('/inventory-list/:freezerId/:categoryId/:itemId',
    successfulMiddlewares.getInventoryItemlistByFreezerAndCategory()
);

router.post('/', 
    errorMiddlewares.missingRequiredParam(tableName), 
    successfulMiddlewares.postDataByTableName(tableName)
);

router.put('/:id', 
    errorMiddlewares.incorrectId(tableName), 
    successfulMiddlewares.updateDataByTableName(tableName)
);

router.patch('/update-quantity/:id',
    errorMiddlewares.incorrectId(tableName),
    successfulMiddlewares.updateItemQuantity()
);

router.delete('/:id', 
    errorMiddlewares.incorrectId(tableName), 
    successfulMiddlewares.deleteDataByTableName(tableName)
);

export default router;