import { IndividualTables, NonInventoryData, NonInventoryQueries } from "../database/nonInventoryDbQueries";

export const checkForMissingRequiredParams = async (tableName: IndividualTables, id: number) => {
    const database = new NonInventoryQueries(tableName);
    const databaseData = await database.getData() as NonInventoryData[];
    console.log(databaseData);
    return databaseData.map(data => Number(data.id)).includes(id);
};