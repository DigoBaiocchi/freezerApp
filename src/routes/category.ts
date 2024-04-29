import { Router } from "express";
import { successfulMiddlewares } from "../controllers/successfulMiddlewares";
import { errorMiddlewares } from "../controllers/errorMiddlewares";
import { TableName } from "../database/dbQueries";

const router:Router = Router();
const tableName:TableName = "category";

router.get('/', 
    successfulMiddlewares.getDataByTableName(tableName)
);

router.post('/', 
    errorMiddlewares.missingRequiredParam(tableName), 
    errorMiddlewares.notUniqueName(tableName), 
    successfulMiddlewares.postDataByTableName(tableName)
);

router.put('/:id', 
    errorMiddlewares.incorrectId(tableName), 
    successfulMiddlewares.updateDataByTableName(tableName)
);

router.delete('/:id', 
    errorMiddlewares.incorrectId(tableName), 
    successfulMiddlewares.deleteDataByTableName(tableName)
);

export default router;