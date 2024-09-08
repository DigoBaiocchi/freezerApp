import { IndividualTables, NonInventoryData, NonInventoryQueries } from "../database/nonInventoryDbQueries";

export const checkForMissingRequiredParams = async (tableName: IndividualTables, id: number) => {
    const database = new NonInventoryQueries(tableName);
    const freezerData = await database.getData() as NonInventoryData[];
    console.log(freezerData);
    return freezerData.map(freezer => freezer.id).includes(id);
};