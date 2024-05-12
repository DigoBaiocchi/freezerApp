import { query } from "./dbConfig";

export type IndividualTables = "freezer" | "category" | "item" | 'unit';

type CollectionReferenceTables = "freezer" | "category";
type CollectionTargetTables = "category" | "item";

export type freezerCategoryData = {
    id: string;
    name: string;
};

export type freezerCategoryPostParams = {
    name: string;
};

export class FreezerCategoryQueries {
    private tableName: IndividualTables

    public constructor(tableName: IndividualTables) {
        this.tableName = tableName;
    }

    public async getData() {
        const selectData = await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
        return selectData as freezerCategoryData[];
    }

    private async getDataById(collectionReference:CollectionReferenceTables, collectionTarget: CollectionTargetTables, id: string) {
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
        
        return addFreezerOrCategory as freezerCategoryData;
    }

    public async updateData({ id, name }: freezerCategoryData) {
        const baseUpdateQuery = `UPDATE ${this.tableName} SET 
                                    name = $1
                                WHERE id = $2;`;
        const updatedData = await query(baseUpdateQuery, [name, id]).then(data => data?.rows[0]);

        return updatedData as freezerCategoryData;
    }

    public async deleteData(id: string) {
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