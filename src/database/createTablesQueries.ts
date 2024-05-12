import { query } from "./dbConfig";

export class CreateDatabaseTables {
    public async createTables() {
        const createFreezerTableQuery = `CREATE TABLE IF NOT EXISTS freezer (
            id uuid DEFAULT gen_random_uuid(),
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createFreezerTableQuery);
    
        const createCategoryTableQuery = `CREATE TABLE IF NOT EXISTS category (
            id uuid DEFAULT gen_random_uuid(),
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createCategoryTableQuery);
    
        const createItemTableQuery = `CREATE TABLE IF NOT EXISTS item (
            id uuid DEFAULT gen_random_uuid(),
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createItemTableQuery);
    
        const createUnitTableQuery = `CREATE TABLE IF NOT EXISTS unit (
            id uuid DEFAULT gen_random_uuid(),
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
        );`;
        await query(createUnitTableQuery);
    
        const createInventoryTable = `CREATE TABLE IF NOT EXISTS inventory (
            id uuid DEFAULT gen_random_uuid(),
            freezer_id uuid REFERENCES freezer (id) ON DELETE CASCADE,
            category_id uuid REFERENCES category (id) ON DELETE CASCADE,
            item_id uuid REFERENCES item (id) ON DELETE CASCADE,
            unit_id uuid REFERENCES unit (id) ON DELETE CASCADE,
            entry_date date NOT NULL,
            exp_date date NOT NULL,
            quantity integer NOT NULL,
            description varchar(100) DEFAULT '',
            PRIMARY KEY (id)
        );`;
        await query(createInventoryTable);
    }
};