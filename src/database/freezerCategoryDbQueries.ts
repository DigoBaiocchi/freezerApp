import { query } from "./dbConfig";

type freezerCategoryItemTables = "freezer" | "category" | "item";
type CollectionReferenceTables = "freezer" | "category";
type CollectionTargetTables = "category" | "item";

export type freezerCategoryData = {
    id: number;
    name: string;
};

export type freezerCategoryPostParams = {
    name: string;
};

export class FreezerCategoryQueries {
    private tableName: freezerCategoryItemTables

    public constructor(tableName: freezerCategoryItemTables) {
        this.tableName = tableName;
    }

    public async getData() {
        const selectData = await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
        return selectData as freezerCategoryData[];
    }

    private async getDataById(collectionReference:CollectionReferenceTables, collectionTarget: CollectionTargetTables, id: number) {
        const selectQUery = `SELECT ${collectionTarget}_id AS id 
                            FROM freezer_category_item 
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
                                    name = $1,
                                WHERE id = $2;`;
        const updatedData = await query(baseUpdateQuery, [name, id]).then(data => data?.rows[0]);

        return updatedData as freezerCategoryData;
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
            default:
                throw new Error("tableName must be freezer or category");
        }
    }
}