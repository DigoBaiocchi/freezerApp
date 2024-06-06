import { query } from "./dbConfig";

export class CreateDatabaseTables {
    public async createTables() {
        const createFreezerTableQuery = `CREATE TABLE IF NOT EXISTS freezer (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createFreezerTableQuery);
    
        const createCategoryTableQuery = `CREATE TABLE IF NOT EXISTS category (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createCategoryTableQuery);
    
        const createItemTableQuery = `CREATE TABLE IF NOT EXISTS item (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createItemTableQuery);
    
        const createUnitTableQuery = `CREATE TABLE IF NOT EXISTS unit (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createUnitTableQuery);
    
        const createInventoryTable = `CREATE TABLE IF NOT EXISTS inventory (
            id SERIAL,
            freezer_id integer REFERENCES freezer (id) ON DELETE CASCADE,
            category_id integer REFERENCES category (id) ON DELETE CASCADE,
            item_id integer REFERENCES item (id) ON DELETE CASCADE,
            unit_id integer REFERENCES unit (id) ON DELETE CASCADE,
            entry_date date NOT NULL,
            exp_date date NOT NULL,
            quantity integer NOT NULL,
            description varchar(100) DEFAULT '',
            PRIMARY KEY (id)
        );`;
        await query(createInventoryTable);
    }
};