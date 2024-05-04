import { query } from "./dbConfig";

export type ItemPostParams = {
    name: string;
    description: string;
    freezerId: number;
    categoryId: number;
    units: number;
    expDate: Date;
};

export type ItemData = {
    id: number;
    name: string;
    description: string;
    freezerId: number;
    categoryId: number;
    units: number;
    expDate: Date;
};

export type freezerCategoryItemData = {
    freezerid: number;
    freezername: string;
    categoryid: number;
    categoryname: string;
    itemid: number;
    itemname: string;
    itemdescription: string;
    itemunits: number;
    itemexpdate: Date;
};

export class ItemQueries {
    private tableName: 'item';

    public constructor() {
        this.tableName = 'item';
    }

    public async getData() {
        const selectDataQuery = `SELECT
                                    freezer.id as freezerId,
                                    freezer.name as freezerName,
                                    category.id as categoryId,
                                    category.name as categoryName,
                                    item.id as itemId,
                                    item.name as itemName,
                                    item.description as itemDescription,
                                    item.units as itemUnits,
                                    item.exp_date as itemExpDate
                                FROM freezer_category_item
                                LEFT JOIN item
                                    ON item.id = freezer_category_item.item_id
                                LEFT JOIN category
                                    ON category.id = freezer_category_item.category_id
                                LEFT JOIN freezer
                                    ON freezer.id = freezer_category_item.freezer_id;`;
        
        return await query(selectDataQuery).then(response => response?.rows) as freezerCategoryItemData[];
    }

    public async postData({name, description, freezerId, categoryId, units, expDate}: ItemPostParams) {
        const itemInsertQuery = `INSERT INTO ${this.tableName} 
                                (name, description, units, exp_date) 
                                VALUES ($1, $2, $3, $4) 
                                RETURNING *;`;
        const freezerCategoryItemInsertQuery = `INSERT INTO freezer_category_item 
                                                (freezer_id, category_id, item_id)
                                                VALUES ($1, $2, $3)
                                                RETURNING *;`;

        const addedItem = await query(itemInsertQuery, [name, description, units, expDate]).then(data => data?.rows[0]);
        
        // Adding to freezer_category_item table
        await query(freezerCategoryItemInsertQuery, [freezerId, categoryId, addedItem.id]);

        return addedItem as ItemData;
    }

    public async updateData({ id, name, description, freezerId, categoryId, units, expDate }: ItemData) {
        const itemUpdateQuery = `UPDATE ${this.tableName} SET 
                                    name = $1,
                                    description = $2,
                                    units = $3,
                                    exp_date = $4
                                WHERE id = $5
                                RETURNING *;`;
        const freezerCategoryItemUpdateQuery = `UPDATE freezer_category_item SET
                                                    freezer_id = $1,
                                                    category_id = $2,
                                                    item_id = $3
                                                WHERE item_id = $3;`;

        const updatedItem = await query(itemUpdateQuery, [name, description, units, expDate, id]).then(data => data?.rows[0]);
        await query(freezerCategoryItemUpdateQuery, [freezerId, categoryId, id]);   

        return updatedItem as ItemData;
    }

    public async updateItemUnits({ id, units }: { id: number; units: number; }) {
        const updateItemQuery = `UPDATE items SET units = $1 WHERE id = $2 RETURNING *;`;

        const updatedItem = await query(updateItemQuery, [id, units]).then(data => data?.rows[0]);

        return updatedItem as ItemData;
    }

    public async deleteData(id: number) {
        const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = $1`;

        return await query(deleteQuery, [id]);
        
    }
}