import request from 'supertest';
import { app, server } from '../src/app';
import { type UpdateFreezerCategoryParams } from '../src/database/dbQueries';

afterAll((done) => {
    server.close(done);
});

let newFreezerData: UpdateFreezerCategoryParams;

describe('POST /freezer', () => {
    it('Add freezer', async () => {
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
    },);
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
        expect(response.body.msg).toBe("Freezer successfully updated")
        expect(response.body).toHaveProperty('updatedData');
    });
});

describe('DELETE /freezer/:id', () => {
    it('Delete freezer data successfully', async () => {
        const response = await request(app)
                                .delete(`/freezer/${newFreezerData.id}`)
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("Freezer successfully deleted")
    });
});