import { query } from "./dbConfig";

export type TableName = 'freezer' | 'category' | 'item';

export type PostParams = {
    name: string;
    description: string;
    freezerId?: number;
    categoryId?: number;
    units?: number;
    expDate?: Date;
};

export type UpdateFreezerCategoryParams = {
    id: number;
    name: string;
    description: string;
};

export type DatabaseParams = {
    id: number;
    name: string;
    description: string;
    units?: number;
    expDate?: Date;
};

// type UpdateParams = UpdateFreezerCategoryParams | UpdateItemParams;

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
        const selectData = await query(`SELECT * FROM ${this.tableName}`).then(response => response?.rows);
        return selectData as DatabaseParams[];
    }

    private async getCollectionById(collectionReference:TableName, collectionTarget: TableName, id: number) {
        const selectQUery = `SELECT ${collectionTarget}_id AS id 
                            FROM freezer_category_item 
                            WHERE ${collectionReference}_id = $1`;
        const result = await query(selectQUery, [id]).then(data => data?.rows);

        return result?.map(data => data.id);
    }

    public async postItem({name, description, freezerId, categoryId, units, expDate}: PostParams) {
        const itemInsertQuery = `INSERT INTO ${this.tableName} 
                                (name, description, units, exp_date) 
                                VALUES ($1, $2, $3, $4) 
                                RETURNING *;`;
        const freezerCategoryItemInsertQuery = `INSERT INTO freezer_category_item 
                                                (freezer_id, category_id, item_id)
                                                VALUES ($1, $2, $3)
                                                RETURNING *;`;
        
        if (this.tableName === 'freezer' || this.tableName === 'category') {
            if (freezerId !== undefined || categoryId !== undefined || units !== undefined || expDate !== undefined) {
                throw new Error("Unexpected parameters to update freezer or category table");
            }

            const freezerCategoryInsertQuery = `INSERT INTO ${this.tableName} 
                                                (name, description) 
                                                VALUES ($1, $2)
                                                RETURNING *;`;
            const addFreezerOrCategory = await query(freezerCategoryInsertQuery, [name, description]).then(data => data?.rows[0]);
            
            return addFreezerOrCategory;
        } else if (this.tableName === 'item') {
            if (freezerId === undefined || categoryId === undefined || units === undefined || expDate === undefined) {
                throw new Error("Unexpected parameters to update item table");
            }

            const addItem = await query(itemInsertQuery, [name, description, units, expDate]).then(data => data?.rows[0]);
            
            // Adding to freezer_category_item table
            await query(freezerCategoryItemInsertQuery, [freezerId, categoryId, addItem.id]);

            return addItem;
        }
    }

    // updateItem({id, name, description}: UpdateFreezerCategoryParams): void;
    // updateItem({id, name, description, units, expDate}: UpdateItemParams): void;

    public async updateItem({ id, name, description, units, expDate }: DatabaseParams) {
        if (this.tableName === 'freezer' || this.tableName === 'category') {
            if (units !== undefined || expDate !== undefined) {
                throw new Error("Unexpected parameters to update freezer or category table");
            }
            const baseUpdateQuery = `UPDATE ${this.tableName} SET 
                                        name = $1,
                                        description = $2 
                                    WHERE id = $3;`;

            await query(baseUpdateQuery, [name, description, id]);
        } else if (this.tableName === 'item') {
            if (units === undefined || expDate === undefined) {
                throw new Error("Unexpected parameters to update item table");
            }
            const itemUpdateQuery = `UPDATE ${this.tableName} SET 
                                        name = $1,
                                        description = $2,
                                        units = $3,
                                        exp_date = $4
                                    WHERE id = $5;`;

            await query(itemUpdateQuery, [name, description, units, expDate, id]);
        } else {
            throw new Error("Invalid table name");
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