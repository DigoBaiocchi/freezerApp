import { IndividualTables, NonInventoryData, NonInventoryQueries } from "../database/nonInventoryDbQueries";

export const checkForMissingRequiredParams = async (tableName: IndividualTables, id: string) => {
    const database = new NonInventoryQueries(tableName);
    const freezerData = await database.getData() as NonInventoryData[];

    return freezerData.map(freezer => freezer.id).includes(id);
};