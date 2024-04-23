import { query } from "./dbConfig";

type TableName = 'freezer' | 'category' | 'item';

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

        const createCategoryTableQuery = `CREATE TABLE IF NOT EXISTS category (
            id SERIAL PRIMARY KEY,
            name varchar(30) NOT NULL UNIQUE,
            description varchar(100)
        );`;
        await query(createCategoryTableQuery);

        const createItemTableQuery = `CREATE TABLE IF NOT EXISTS item (
            id SERIAL PRIMARY KEY,
            name varchar(30) NOT NULL UNIQUE,
            description varchar(100),
            units integer,
            exp_date date
        );`;
        await query(createItemTableQuery);

        const createFreezerCategoryItemTable = `CREATE TABLE IF NOT EXISTS freezer_category_item (
            freezer_id integer REFERENCES freezer (id) ON DELETE CASCADE,
            category_id integer REFERENCES category (id) ON DELETE CASCADE,
            item_id integer REFERENCES item (id) ON DELETE CASCADE
        );`;
        await query(createFreezerCategoryItemTable);
    }

    async getItems() {
        return await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
    }

    async postItem({name, description, freezerId, categoryId, itemTotal, expDate}: PostProps) {
        const freezerCategoryInsertQuery = `INSERT INTO ${this.tableName} (name, description) VALUES ($1, $2)`;
        const itemInsertQuery = `INSERT INTO ${this.tableName} (name, description, units, exp_date) VALUES ($1, $2, $3, $4) RETURNING *`;
        const freezerCategoryItemInsertQuery = `INSERT INTO freezer_category_item 
                                                (freezer_id, category_id, item_id, item_total, item_exp_date)
                                                VALUES ($1, $2, $3);`;

        switch (this.tableName) {
            case 'freezer':
                await query(freezerCategoryInsertQuery, [name, description]);
                break;
            case 'category':
                await query(freezerCategoryInsertQuery, [name, description]);
                break; 
            case 'item':
                await query(itemInsertQuery, [name, description, itemTotal, expDate]).then(data => {
                    console.log(data?.rows);
                    query(freezerCategoryItemInsertQuery, [freezerId, categoryId, data?.rows[0].id]);
                });
                break;
            default:
                throw new Error('Please select a valid table, currently the valid tables are: freezer, category and item.');
        }
    }
}