import { query } from "./dbConfig";

export type InventoryPostParams = {
    freezerId: string;
    categoryId: string;
    itemId: string;
    unitId: number;
    quantity: number;
    entryDate: Date;
    expDate: Date;
    description: string;
};

export type InventoryData = {
    id: string;
} & InventoryPostParams;

export type DetailedInventoryData = {
    id: string;
    freezerid: string;
    freezername: string;
    categoryid: string;
    categoryname: string;
    itemid: string;
    itemname: string;
    unitid: string;
    unitname: string;
    quantity: number;
    entrydate: Date;
    expdate: Date;
    itemdescription: string;
};

export class ItemQueries {
    private tableName: 'inventory';

    public constructor() {
        this.tableName = 'inventory';
    }

    public async getData() {
        const selectDataQuery = `SELECT
                                    inventory.id
                                    freezer.id as freezerId,
                                    freezer.name as freezerName,
                                    category.id as categoryId,
                                    category.name as categoryName,
                                    item.id as itemId,
                                    item.name as itemName,
                                    unit.id as unitId,
                                    unit.name as unitName,
                                    inventory.quantity as quantity,
                                    inventory.entry_date as entryDate,
                                    inventory.exp_date as expDate,
                                    inventory.description as description
                                FROM inventory
                                LEFT JOIN item
                                    ON item.id = inventory.item_id
                                LEFT JOIN category
                                    ON category.id = inventory.category_id
                                LEFT JOIN freezer
                                    ON freezer.id = inventory.freezer_id
                                LEFT JOIN unit
                                    ON unit.id = inventory.unit_id;`;
        
        return await query(selectDataQuery).then(response => response?.rows) as DetailedInventoryData[];
    }

    public async postData({
        freezerId, 
        categoryId, 
        itemId, 
        unitId, 
        quantity,
        entryDate, 
        expDate,
        description, 
    }: InventoryPostParams) {
        const itemInsertQuery = `INSERT INTO ${this.tableName} 
                                (freezer_id, category_id, item_id, unit_id, entry_date, exp_date, quantity, description) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                                RETURNING *;`;

        const addedItem = await query(
            itemInsertQuery, 
            [freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description]
        ).then(data => data?.rows[0]);

        return addedItem as InventoryData;
    }

    public async updateData({
        id,
        freezerId, 
        categoryId, 
        itemId, 
        unitId, 
        quantity,
        entryDate, 
        expDate,
        description, 
    }: InventoryData) {
        const itemUpdateQuery = `UPDATE ${this.tableName} SET 
                                    freezer_id = $1,
                                    category_id = $2,
                                    item_id = $3,
                                    unit_id = $4,
                                    entry_date = $5,
                                    exp_date = $6,
                                    quantity = $7,
                                    description = $8
                                WHERE id = $9
                                RETURNING *;`;

        const updatedItem = await query(
            itemUpdateQuery, 
            [freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description, id]
        ).then(data => data?.rows[0]);

        return updatedItem as InventoryData;
    }

    public async updateItemUnits({ id, quantity }: { id: string; quantity: number; }) {
        const updateItemQuery = `UPDATE ${this.tableName} SET quantity = $1 WHERE id = $2 RETURNING *;`;

        const updatedItem = await query(updateItemQuery, [quantity, id]).then(data => data?.rows[0]);

        return updatedItem as InventoryData;
    }

    public async deleteData(id: string) {
        const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = $1`;

        return await query(deleteQuery, [id]);
        
    }
}