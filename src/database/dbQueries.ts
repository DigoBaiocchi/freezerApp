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

export type UpdateFreezerCategoryParams = {
    id: number;
    name: string;
    description: string;
};

export type UpdateItemParams = {
    id: number;
    name: string;
    description: string;
    units: number;
    expDate: Date;
};

type UpdateParams = UpdateFreezerCategoryParams | UpdateItemParams;

class CreateDatabaseTables {
    protected async createTables() {
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
};

export class DatabaseQueries extends CreateDatabaseTables {
    private tableName: TableName;

    public constructor(tableName: TableName) {
        super();
        this.tableName = tableName
        // this.createTables();
    }

    public async getItems() {
        return await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
    }

    private async getCollectionById(collectionReference:TableName, collectionTarget: TableName, id: number) {
        const selectQUery = `SELECT ${collectionTarget}_id AS id FROM freezer_category_item WHERE ${collectionReference}_id = $1`;
        const result = await query(selectQUery, [id]).then(data => data?.rows);

        return result?.map(data => data.id);
    }

    public async postItem({name, description, freezerId, categoryId, itemTotal, expDate}: PostProps) {
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

    // getUpdateProps(id: number, name: string, description: string): UpdateParams;
    // getUpdateProps(id: number, name: string, description: string, units: number, expDate: Date): UpdateParams;

    // getUpdateProps(id: number, name: string, description: string, units?: number, expDate?: Date): UpdateParams {
    //     if (this.tableName === 'freezer' || this.tableName === 'category') {
    //         if (units !== undefined || expDate !== undefined) {
    //             throw new Error("Unexpected parameters for category");
    //         }
    //         return { id, name, description } as UpdateFreezerCategoryParams;
    //     } else if (this.tableName === 'item') {
    //         if (units === undefined || expDate === undefined) {
    //             throw new Error("Unexpected parameters for item");
    //         }
    //         return { id, name, description, units, expDate } as UpdateItemParams;
    //     }
    //     throw new Error("Invalid table name");
    // }

    public async updateItem({id, name, description, units, expDate}: UpdateParams) {
        const baseUpdateQuery = `UPDATE ${this.tableName} SET 
                                    name = $1
                                    description = $2 
                                WHERE id = $3;`;
        const itemUpdateQuery = `UPDATE ${this.tableName} SET 
                                    name = $1
                                    description = $2 
                                    units = $3
                                    exp_date = $4
                                WHERE id = $5;`;
        
        switch (this.tableName) {
            case "freezer":
                await query(baseUpdateQuery, [id, name, description]);
                break;
            case "category":
                await query(baseUpdateQuery, [id, name, description]);
            case "item":
                await query(baseUpdateQuery, [id, name, description, units, expDate]);
            default:
                break;
        }
    }

    public async deleteItem(id: number) {
        const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

        switch(this.tableName) {
            case 'freezer':
                const categoriesId = await this.getCollectionById("freezer", "category", id);
                categoriesId?.forEach(collection => this.deleteItem(collection.id));
                return await query(deleteQuery);
            case 'category':
                const productsId = await this.getCollectionById("category", "item", id);
                productsId?.forEach(collection => this.deleteItem(collection.id));
                return await query(deleteQuery);
            case 'item':
                return await query(deleteQuery);
        }
    }
}