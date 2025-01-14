import { query } from "./dbConfig";

export type IndividualTables = "freezer" | "category" | "item" | 'unit' | 'location';

type CollectionReferenceTables = "freezer" | "category";
type CollectionTargetTables = "category" | "item";

export type NonInventoryData = {
    id: number;
    name: string;
};

export type NonInventoryPostParams = {
    name: string;
};

export class NonInventoryQueries {
    private tableName: IndividualTables

    public constructor(tableName: IndividualTables) {
        this.tableName = tableName;
    }

    public async getData() {
        const selectData = await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
        return selectData as NonInventoryData[];
    }

    private async getDataById(collectionReference:CollectionReferenceTables, collectionTarget: CollectionTargetTables, id: number) {
        const selectQUery = `SELECT ${collectionTarget}_id AS id 
                            FROM inventory 
                            WHERE ${collectionReference}_id = $1`;
        const result = await query(selectQUery, [id]).then(data => data?.rows);
    
        return result?.map(data => data.id);
    }

    public async postData(name: string) {
        const freezerCategoryInsertQuery = `INSERT INTO ${this.tableName} 
                                            (name) 
                                            VALUES ($1)
                                            RETURNING *;`;
        const addFreezerOrCategory = await query(freezerCategoryInsertQuery, [name]).then(data => data?.rows[0]);
        
        return addFreezerOrCategory as NonInventoryData;
    }

    public async updateData({ id, name }: NonInventoryData) {
        const baseUpdateQuery = `UPDATE ${this.tableName} SET 
                                    name = $1
                                WHERE id = $2;`;
        const updatedData = await query(baseUpdateQuery, [name, id]).then(data => data?.rows[0]);

        return updatedData as NonInventoryData;
    }

    public async deleteData(id: number) {
        const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = $1`;

        switch(this.tableName) {
            case 'freezer':
                const categoriesId = await this.getDataById("freezer", "category", id);
                categoriesId?.forEach(data => this.deleteData(data.id));
                return await query(deleteQuery, [id]);
            case 'category':
                const productsId = await this.getDataById("category", "item", id);
                productsId?.forEach(data => this.deleteData(data.id));
                return await query(deleteQuery, [id]);
            case 'item':
                return await query(deleteQuery, [id]);
            case 'unit':
                return await query(deleteQuery, [id]);
            default:
                throw new Error("tableName must be freezer or category");
        }
    }
}