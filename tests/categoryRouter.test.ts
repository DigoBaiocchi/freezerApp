import request from 'supertest';
import { app, server } from '../src/app';
import { TableName, type UpdateFreezerCategoryParams } from '../src/database/dbQueries';

afterEach((done) => {
    server.close(() => {
        console.log('Server closed!');
        done();
    });
});

let newData: UpdateFreezerCategoryParams;
const tableName: TableName = "category";

describe(`POST /${tableName}`, () => {
    const path = `/${tableName}`;

    it(`Add ${tableName} successfully`, async () => {
        const response = await request(app)
                                .post(path)
                                .set('accept', 'application/json')
                                .send({
                                    "name": `${tableName} Test`,
                                    "description": "",
                                })
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('newData');

        newData = response.body['newData'];
    });

    it(`400 error - missing name`, async () => {
        const response = await request(app)
                                .post(path)
                                .set('accept', 'application/json')
                                .send({
                                    "name": "",
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("No name provided");
    });

    it(`400 error - trying to add not unique name`, async () => {
        const response = await request(app)
                                .post(path)
                                .set('accept', 'application/json')
                                .send({
                                    "name": `${tableName} test`,
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Name already exists");
    });
});

describe(`GET /${tableName}`, () => {
    const path = `/${tableName}`;

    it('Return object array with all data', async () => {
        const response = await request(app).get(path)
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe(`PUT /${tableName}/:id`, () => {
    const path = `/${tableName}`;

    it('Update data successfully', async () => {
        const response = await request(app)
                                .put(`${path}/${newData.id}`)
                                .set('accept', 'application/json')
                                .send({
                                    "name": `${tableName} Test 2`,
                                    "description": "New Description",
                                });

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe(`${tableName} successfully updated`);
        expect(response.body).toHaveProperty('updatedData');
    });

    it('400 error - id param does not exist', async () => {
        const response = await request(app)
                                .put(`${path}/0`)
                                .set('accept', 'application/json')
                                .send({
                                    "name": `${tableName} Test`,
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Id param does not exist");
    });
});

describe(`DELETE /${tableName}/:id`, () => {
    const path = `/${tableName}`;

    it('Delete data successfully', async () => {
        const response = await request(app)
                                .delete(`${path}/${newData.id}`)
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe(`${tableName} successfully deleted`)
    });

    it('400 error - id param does not exist', async () => {
        const response = await request(app)
                                .delete(`${path}/0`)
                                .set('accept', 'application/json')
                                .send({
                                    "name": `${tableName} Test`,
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Id param does not exist");
    });
});