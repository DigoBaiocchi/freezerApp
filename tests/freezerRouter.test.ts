import request from 'supertest';
import { app, server } from '../src/app';
import { type UpdateFreezerCategoryParams } from '../src/database/dbQueries';

afterAll((done) => {
    server.close(done);
});

let newFreezerData: UpdateFreezerCategoryParams;

describe('POST /freezer', () => {
    it('Add freezer successfully', async () => {
        const response = await request(app)
                                .post('/freezer')
                                .set('accept', 'application/json')
                                .send({
                                    "name": "Freezer Test",
                                    "description": "",
                                })
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('newData');

        newFreezerData = response.body['newData'];
    });

    it('400 error - missing freezer name', async () => {
        const response = await request(app)
                                .post('/freezer')
                                .set('accept', 'application/json')
                                .send({
                                    "name": "",
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("No name provided");
    });

    it('400 error - trying to add not unique name', async () => {
        const response = await request(app)
                                .post('/freezer')
                                .set('accept', 'application/json')
                                .send({
                                    "name": "Freezer Test",
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Name already exists");
    });
});

describe('GET /freezer', () => {
    it('Return object array with all freezers', async () => {
        const response = await request(app).get('/freezer')
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe('PUT /freezer/:id', () => {
    it('Update freezer data successfully', async () => {
        const response = await request(app)
                                .put(`/freezer/${newFreezerData.id}`)
                                .set('accept', 'application/json')
                                .send({
                                    "name": "Freezer Test 2",
                                    "description": "New Description",
                                });

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("Freezer successfully updated");
        expect(response.body).toHaveProperty('updatedData');
    });

    it('400 error - id param does not exist', async () => {
        const response = await request(app)
                                .put(`/freezer/0`)
                                .set('accept', 'application/json')
                                .send({
                                    "name": "Freezer Test",
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Id param does not exist");
    });
});

describe('DELETE /freezer/:id', () => {
    it('Delete freezer successfully', async () => {
        const response = await request(app)
                                .delete(`/freezer/${newFreezerData.id}`)
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("Freezer successfully deleted")
    });

    it('400 error - id param does not exist', async () => {
        const response = await request(app)
                                .delete(`/freezer/0`)
                                .set('accept', 'application/json')
                                .send({
                                    "name": "Freezer Test",
                                    "description": "",
                                })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Id param does not exist");
    });
});