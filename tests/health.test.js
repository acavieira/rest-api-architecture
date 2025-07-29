const request = require('supertest');
const { app, server } = require('../server'); // Export the app in server.js for testing

describe('Health Check', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('should return status ok', async () => {
        const res = await request(app).get('/api/v1/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('ok');
    });
});