import { Router } from "express";
import { successfulMiddlewares } from "../controllers/successfulMiddlewares";
import { incorrectId, missingName, notUniqueName } from "../controllers/errorMiddlewares";
import { TableName } from "../database/dbQueries";

const router:Router = Router();
const tableName:TableName = "category";

router.get('/', 
    successfulMiddlewares.getDataByTableName(tableName)
);

router.post('/', 
    missingName, 
    notUniqueName(tableName), 
    successfulMiddlewares.postDataByTableName(tableName)
);

router.put('/:id', 
    incorrectId(tableName), 
    successfulMiddlewares.updateDataByTableName(tableName)
);

router.delete('/:id', 
    incorrectId(tableName), 
    successfulMiddlewares.deleteDataByTableName(tableName)
);

export default router;