import request from 'supertest';
import { app, server } from '../src/app';

afterAll((done) => {
    server.close(done);
});

describe('POST /freezer tests', () => {
    test('Add freezer', (done) => {
        request(app)
            .post('/freezer')
            .set('accept', 'application/json')
            .send()
            .expect(201)
    });
});

describe('GET /freezer tests', () => {
    test('Return object array with all freezers', (done) => {
        request(app)
            .get('/freezer')
            // .set('accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .expect({"data": []})
            .end((err, res) => {
                if (err) throw done(err);
                done();
            })
            
    });
});