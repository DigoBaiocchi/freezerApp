import { query } from "./dbConfig";
import { IndividualTables } from "./nonInventoryDbQueries";

type tableNames = IndividualTables | 'inventory' | 'test';

export class CreateDatabaseTables {
    public async createIndividualTable(tableName: tableNames) {
        const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
            id SERIAL,
            name varchar(30) NOT NULL UNIQUE,
            PRIMARY KEY (id)
            );`;

        await query(createTableQuery);
    }
            
    public async createInventoryTable() {
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