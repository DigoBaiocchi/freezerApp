import { query } from "./dbConfig";

export type InventoryPostParams = {
    freezerId: number;
    categoryId: number;
    itemId: number;
    unitId: number;
    locationId: number;
    quantity: number;
    entryDate: Date;
    expDate: Date;
    description: string;
};

export type InventoryData = {
    id: number;
} & InventoryPostParams;

export type DetailedInventoryData = {
    id: number;
    freezername: string;
    categoryname: string;
    itemname: string;
    unitname: string;
    locationname: string;
    quantity: number;
    entrydate: Date;
    expdate: Date;
    itemdescription: string;
};

export type CategorySummaryData = {
    freezerid: number;
    categoryid: number;
    categoryname: string;
    categorytotal: number;
};

export type ItemSummaryData = {
    freezerid: number;
    categoryid: number;
    itemid: number;
    itemname: string;
    itemtotal: number;
};

export type IventorySummaryData = {
    inventoryId: number;
    freezerid: number;
    categoryid: number;
    itemid: number;
    itemname: string;
    unitname: string;
    itemquantity: number;
    entryDate: Date;
    expDate: Date;
    description: string;
};

type GetDataView = "raw" | "formated by name";

export class InventoryQueries {
    private tableName: 'inventory';

    public constructor() {
        this.tableName = 'inventory';
    }

    public async getData(dataView: GetDataView) {
        let selectDataQuery: string;

        if (dataView === "formated by name") {
            selectDataQuery = `SELECT
                                        inventory.id,
                                        freezer.name as freezerName,
                                        category.name as categoryName,
                                        item.name as itemName,
                                        unit.name as unitName,
                                        location.name as locationName,
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
                                        ON unit.id = inventory.unit_id
                                    LEFT JOIN location
                                        ON location.id = inventory.location_id;`;

        } else {
            selectDataQuery = `SELECT * FROM inventory`;
        }
        
        return await query(selectDataQuery).then(response => response?.rows) as DetailedInventoryData[];
    }

    public async getCategorySummaryByFreezer(freezerId: number) {
        const selectDataQuery = `SELECT
                                    freezer.id as freezerid,
                                    category.id as categoryid,
                                    category.name as categoryname,
                                    COUNT(category.id) as categorytotal
                                FROM inventory
                                LEFT JOIN category
                                    ON category.id = inventory.category_id
                                LEFT JOIN freezer
                                    ON freezer.id = inventory.freezer_id
                                WHERE freezer.id = $1
                                GROUP BY freezerid, categoryid, categoryname;`;
        
        return await query(selectDataQuery, [freezerId])
                        .then(response => response?.rows) as CategorySummaryData[];
    }

    public async getItemSummaryByFreezer(
        { freezerId, categoryId }: { freezerId: number; categoryId: number }
    ) {
        const selectDataQuery = `SELECT
                                    freezer.id as freezerid,
                                    category.id as categoryid,
                                    item.id as itemid,
                                    item.name as itemname,
                                    sum(inventory.quantity) as itemtotal
                                FROM inventory
                                LEFT JOIN item
                                    ON item.id = inventory.item_id
                                LEFT JOIN category
                                    ON category.id = inventory.category_id
                                LEFT JOIN freezer
                                    ON freezer.id = inventory.freezer_id
                                WHERE freezer.id = $1 AND category.id = $2
                                GROUP BY freezerid, categoryid, itemid, itemname;`;
        
        return await query(selectDataQuery, [freezerId, categoryId])
                        .then(response => response?.rows) as ItemSummaryData[];
    }

    public async getItemSummaryByQuantity() {
        const selectDataQuery = `SELECT
                                    freezer.id as freezerid,
                                    category.id as categoryid,
                                    item.id as itemid,
                                    item.name as itemname,
                                    sum(inventory.quantity) as itemtotal
                                FROM inventory
                                LEFT JOIN item
                                    ON item.id = inventory.item_id
                                LEFT JOIN category
                                    ON category.id = inventory.category_id
                                LEFT JOIN freezer
                                    ON freezer.id = inventory.freezer_id
                                GROUP BY freezerid, categoryid, itemid, itemname
                                ORDER BY itemname;`;
        
        return await query(selectDataQuery)
                        .then(response => response?.rows) as ItemSummaryData[];
    }

    public async getInventorySummaryByFreezerAndCagegory({
        freezerId, categoryId, itemId
    }: { freezerId: number; categoryId: number; itemId: number; }) {
        const selectDataQuery = `SELECT
                                    inventory.id,
                                    item.name as itemName,
                                    unit.id as unitid,
                                    unit.name as unitName,
                                    location.id as locationid,
                                    location.name as locationName,
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
                                    ON unit.id = inventory.unit_id
                                LEFT JOIN location
                                    ON location.id = inventory.location_id
                                WHERE freezer.id = $1 AND category.id = $2 AND item.id = $3
                                ORDER BY expDate;`;
        
        return await query(selectDataQuery, [freezerId, categoryId, itemId])
                        .then(response => response?.rows) as IventorySummaryData[];
    }

    public async postData({
        freezerId, 
        categoryId, 
        itemId, 
        unitId, 
        locationId,
        quantity,
        entryDate, 
        expDate,
        description, 
    }: InventoryPostParams) {
        const itemInsertQuery = `INSERT INTO ${this.tableName} 
                                (freezer_id, category_id, item_id, unit_id, location_id, entry_date, exp_date, quantity, description) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                                RETURNING *;`;

        const addedItem = await query(
            itemInsertQuery, 
            [freezerId, categoryId, itemId, unitId, locationId, entryDate, expDate, quantity, description]
        ).then(data => data?.rows[0]);

        return addedItem as InventoryData;
    }

    public async updateData({
        id,
        freezerId, 
        categoryId, 
        itemId, 
        unitId, 
        locationId,
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
                                    location_id = $5,
                                    entry_date = $6,
                                    exp_date = $7,
                                    quantity = $8,
                                    description = $9
                                WHERE id = $10
                                RETURNING *;`;

        const updatedItem = await query(
            itemUpdateQuery, 
            [freezerId, categoryId, itemId, unitId, locationId, entryDate, expDate, quantity, description, id]
        ).then(data => data?.rows[0]);

        return updatedItem as InventoryData;
    }

    public async updateItemUnits({ id, quantity }: { id: number; quantity: number; }) {
        const updateItemQuery = `UPDATE ${this.tableName} SET quantity = $1 WHERE id = $2 RETURNING *;`;

        const updatedItem = await query(updateItemQuery, [quantity, id]).then(data => data?.rows[0]);

        return updatedItem as InventoryData;
    }

    public async deleteData(id: number) {
        const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = $1`;

        return await query(deleteQuery, [id]);
        
    }
}