const request = require('supertest');
const server = require('../../api/server');
const db = require('../../database/dbConfig');

beforeAll(async () => {
    await db('users').truncate();
});

describe('Authentication routes', () => {
    describe('Registration Routes / Handlers', () => {
        test('Returns username error', async () => {
            let noUsername = { user: '', password: 'xTorsion' };
            let res = await request(server)
                .post('/api/auth/register')
                .send(noUsername);
            console.log(res.body);
            expect(res.status).toBe(409);
            expect(res.body.message).toEqual('Missing Username');
        });

        test('Returns password error', async () => {
            let noPassword = { username: 'Offstine Jack', passwor: '' };
            let res = await request(server)
                .post('/api/auth/register')
                .send(noPassword);
            console.log(res.body);
            expect(res.status).toBe(409);
            expect(res.body.message).toEqual('Missing Password');
        });

        test('Succesfully Registers', async () => {
            let goodAuth = { username: 'Offstine Jack', password: 'xTorsion' };
            let res = await request(server)
                .post('/api/auth/register')
                .send(goodAuth);
            console.log(res.body);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([1]);
        });
    });
});
