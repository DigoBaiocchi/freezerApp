import { query } from "./dbConfig";
import { IndividualTables } from "./nonInventoryDbQueries";

type tableNames = IndividualTables | 'inventory' | 'test';

export class DatabaseSchema {
    public async applyDatabaseSchemaChanges() {
        const createCategoryTable = `CREATE TABLE IF NOT EXISTS category (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
            );`;
        await query(createCategoryTable);

        const createFreezerTable = `CREATE TABLE IF NOT EXISTS freezer (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
            );`;
        await query(createFreezerTable);

        const createItemTable = `CREATE TABLE IF NOT EXISTS item (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
            );`;
        await query(createItemTable);

        const createUnitTable = `CREATE TABLE IF NOT EXISTS unit (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
            );`;
        await query(createUnitTable);

        const createLocationTable = `CREATE TABLE IF NOT EXISTS location (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
            );`;
        await query(createLocationTable);

        const createInventoryTable = `CREATE TABLE IF NOT EXISTS inventory (
            id SERIAL,
            freezer_id integer REFERENCES freezer (id) ON DELETE CASCADE,
            category_id integer REFERENCES category (id) ON DELETE CASCADE,
            item_id integer REFERENCES item (id) ON DELETE CASCADE,
            unit_id integer REFERENCES unit (id) ON DELETE CASCADE,
            location_id integer REFERENCES location (id) ON DELETE CASCADE,
            entry_date date NOT NULL,
            exp_date date NOT NULL,
            quantity integer NOT NULL,
            description varchar(100) DEFAULT '',
            PRIMARY KEY (id)
        );`;
        await query(createInventoryTable);

        // const alterInventoryTable = `ALTER TABLE inventory 
        //     ADD location_id integer REFERENCES location (id) ON DELETE CASCADE`;
        // await query(alterInventoryTable);
    }
};