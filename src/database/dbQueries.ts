import { query } from "./dbConfig";

type TableName = 'freezer' | 'categories' | 'items';

export type PostProps = {
    name: string;
    description: string;
    freezerId?: number;
    categoryId?: number;
    itemTotal?: number;
    expDate?: Date;
};

export class DatabaseQueries {
    tableName: TableName;

    constructor(tableName: TableName) {
        this.tableName = tableName
        this.createTables();
    }

    async createTables() {
        const createFreezerTableQuery = `CREATE TABLE IF NOT EXISTS freezer (
            id SERIAL PRIMARY KEY,
            name varchar(30) NOT NULL UNIQUE,
            description varchar(100)
        );`;
        await query(createFreezerTableQuery);

        const createItemTableQuery = `CREATE TABLE IF NOT EXISTS item (
            id SERIAL PRIMARY KEY,
            name varchar(30) NOT NULL UNIQUE,
            description varchar(100),
            units integer,
            exp_date date
        );`;
        const freezerCategoryItemTable = `CREATE TABLE IF NOT EXISTS freezer_category_item (
            freezer_id REFERENCES freezer (id) ON DELETE CASCADE,
            category_id REFERENCES category (id) ON DELETE CASCADE,
            item_id REFERENCES item (id) ON DELETE CASCADE
        );`;
    }

    async getItems() {
        return await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
    }

    async postItem({name, description, freezerId, categoryId, itemTotal, expDate}: PostProps) {
        switch (this.tableName) {
            case 'freezer':
                await query(`INSERT INTO freezer (name, description) VALUES ($1, $2)`, [name, description]);
                break;
            case 'categories':
                await query(`INSERT INTO categories (name, description) VALUES ($1, $2)`, [name, description]);
                break; 
            case 'items':
                await query(`INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *`, [name, description]).then(data => {
                    console.log(data?.rows);
                    query(`
                        INSERT INTO freezer_categories_items_totals 
                            (freezer_id, category_id, item_id, item_total, item_exp_date)
                        VALUES ($1, $2, $3, $4, $5);
                        `, [freezerId, categoryId, data?.rows[0].id, itemTotal, expDate]);
                });
                await query(`INSERT INTO freezer_categories_items_totals 
                            (name, description) VALUES ($1, $2)`, [name, description]);
                break;
        }
    }
}