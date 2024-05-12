const createFreezerTableQuery = `CREATE TABLE IF NOT EXISTS freezer (
    id integer SERIAL PRIMARY KEY ,
    name varchar(30) NOT NULL UNIQUE,
    description varchar(100)
);`;

const createCategoryTableQuery = `CREATE TABLE IF NOT EXISTS category (
    id integer SERIAL PRIMARY KEY ,
    name varchar(30) NOT NULL UNIQUE,
    description varchar(100)
);`;

const createItemTableQuery = `CREATE TABLE IF NOT EXISTS item (
    id integer SERIAL PRIMARY KEY ,
    name varchar(30) NOT NULL UNIQUE,
    description varchar(100),
    units integer,
    exp_date date
);`;

const createFreezerCategoryItemTable = `CREATE TABLE IF NOT EXISTS freezer_category_item (
    freezer_id integer REFERENCES freezer (id) ON DELETE CASCADE,
    category_id integer REFERENCES category (id) ON DELETE CASCADE,
    item_id integer REFERENCES item (id) ON DELETE CASCADE
);`;

const createFreezerCategoryItemTableV2 = `CREATE TABLE IF NOT EXISTS freezer_category_item (
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