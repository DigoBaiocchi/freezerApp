import request from 'supertest';
import { app, server } from '../src/app';
import { type DatabaseParams, type TableName, type UpdateFreezerCategoryParams } from '../src/database/dbQueries';

describe("Freezer tests", () => {
    // afterAll((done) => {
    //     server.close(() => {
    //         console.log('Server closed!');
    //         done();
    //     });
    // });
    
    let newData: UpdateFreezerCategoryParams;
    
    describe(`POST /freezer`, () => {
        const tableName: TableName = "freezer";
        const path = `/${tableName}`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
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
    
    describe(`GET /freezer`, () => {
        const tableName: TableName = "freezer";
        const path = `/freezer`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
        it('Return object array with all data', async () => {
            const response = await request(app).get(path)
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });
    });
    
    describe(`PUT /freezer/:id`, () => {
        const tableName: TableName = "freezer";
        const path = `/${tableName}`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
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
    
    describe(`DELETE /freezer:id`, () => {
        const tableName: TableName = "freezer";
        const path = `/${tableName}`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
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
});

describe('Categories tests', () => {
    // afterAll((done) => {
    //     server.close(() => {
    //         console.log('Server closed!');
    //         done();
    //     });
    // });
    
    let newData: UpdateFreezerCategoryParams;
    const tableName: TableName = "category";
    
    describe(`POST /${tableName}`, () => {
        const path = `/${tableName}`;
        
        afterAll((done) => {
            server.close(() => {
                console.log('Server closed!');
                done();
            });
        });
    
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
        
        afterAll((done) => {
            server.close(() => {
                console.log('Server closed!');
                done();
            });
        });
    
        it('Return object array with all data', async () => {
            const response = await request(app).get(path)
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });
    });
    
    describe(`PUT /${tableName}/:id`, () => {
        const path = `/${tableName}`;
        
        afterAll((done) => {
            server.close(() => {
                console.log('Server closed!');
                done();
            });
        });
    
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
        
        afterAll((done) => {
            server.close(() => {
                console.log('Server closed!');
                done();
            });
        });
    
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
});

describe('Items tests', () => {
    let newFreezerData: DatabaseParams;
    let newCategoryData: DatabaseParams;
    
    beforeAll(async () => {
        const freezerResponse = await request(app)
                                        .post('/freezer')
                                        .set('accept', 'application/json')
                                        .send({
                                            "name": "Freezer Test",
                                            "description": ""
                                        });
        newFreezerData = freezerResponse.body['newData'];
        console.log(newFreezerData)
        
        const categoryResponse = await request(app)
                                        .post('/category')
                                        .set('accept', 'application/json')
                                        .send({
                                            "name": "Category Test",
                                            "description": ""
                                        });
        newCategoryData = categoryResponse.body['newData'];
        console.log(newCategoryData)
    });
    
    afterAll(async () => {
        // delete freezer data
        await request(app)
                .delete(`/freezer/${newFreezerData.id}`)
    
        // delete category data
        await request(app)
                .delete(`/category/${newCategoryData.id}`)
    
        // server.close(() => {
        //     console.log('Server closed!');
        //     done();
        // });
    });
    
    let newData: DatabaseParams;
    const expDate = new Date();
    
    describe(`POST /item`, () => {
        const tableName: TableName = "item";
        const path = `/${tableName}`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
        it(`Add ${tableName} successfully`, async () => {
            const response = await request(app)
                                    .post(path)
                                    .set('accept', 'application/json')
                                    .send({
                                        "name": `${tableName} Test`,
                                        "description": "",
                                        "freezerId": newFreezerData.id,
                                        "categoryId": newCategoryData.id,
                                        "units": 1,
                                        "expDate": "2024-04-27"
                                    })
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('newData');
    
            newData = response.body['newData'];
            console.log("item data", newData)
        });
    
        it(`400 error - missing name`, async () => {
            const response = await request(app)
                                    .post(path)
                                    .set('accept', 'application/json')
                                    .send({
                                        "name": "",
                                        "description": "",
                                        "freezerId": newFreezerData.id,
                                        "categoryId": newCategoryData.id,
                                        "units": 1,
                                        "expDate": "2024-04-27"
                                    })
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("No name provided");
        });
    
        it(`404 error - Incorrect item params provided`, async () => {
            const response = await request(app)
                                    .post(path)
                                    .set('accept', 'application/json')
                                    .send({
                                        "name": `${tableName} test 2`,
                                        "description": "",
                                        "freezerId": newFreezerData.id * 100,
                                        "categoryId": newCategoryData.id,
                                        "units": 1,
                                        "expDate": "2024-04-27"
                                    })
            console.log(response.body.error)
            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Incorrect item params provided");
        });
    
        it(`404 error - Incorrect item params provided`, async () => {
            const response = await request(app)
                                    .post(path)
                                    .set('accept', 'application/json')
                                    .send({
                                        "name": `${tableName} test 3`,
                                        "description": "",
                                        "freezerId": newFreezerData.id,
                                        "units": 1,
                                        "expDate": "2024-04-27"
                                    })
            
            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Incorrect item params provided");
        });
    
        it(`400 error - trying to add not unique name`, async () => {
            const response = await request(app)
                                    .post(path)
                                    .set('accept', 'application/json')
                                    .send({
                                        "name": `${tableName} test`,
                                        "description": "",
                                        "freezerId": newFreezerData.id,
                                        "categoryId": newCategoryData.id,
                                        "units": 1,
                                        "expDate": "2024-04-27"
                                    })
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Name already exists");
        });
    });
    
    describe(`GET /item`, () => {
        const tableName: TableName = "item";
        const path = `/${tableName}`;
        console.log(path)

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
        it('Return object array with all data', async () => {
            const response = await request(app).get(path)
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });
    });
    
    describe(`PUT /item/:id`, () => {
        const tableName: TableName = "item";
        const path = `/${tableName}`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
        it('Update data successfully', async () => {
            const response = await request(app)
                                    .put(`${path}/${newData.id}`)
                                    .set('accept', 'application/json')
                                    .send({
                                        "name": `${tableName} Test 2`,
                                        "description": "New Description",
                                        "units": 1,
                                        "expDate": "2024-04-27"
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
                                        "units": 1,
                                        "expDate": "2024-04-27"
                                    })
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Id param does not exist");
        });
    });
    
    describe(`DELETE /item/:id`, () => {
        const tableName: TableName = "item";
        const path = `/${tableName}`;

        afterAll((done) => {
            server.close(() => {
                console.log('Server Closed!');
                done();
            });
        });
    
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
});
