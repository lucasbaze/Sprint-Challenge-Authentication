const Auth = require('../auth-model');
const db = require('../../database/dbConfig');

beforeAll(async () => {
    await db('users').truncate();
});

describe('Authentication Modesl', () => {
    test('Can add a new user to the database', async () => {
        let newUser = { username: 'Test Icules', password: 'extremetorsion' };
        let [savedUser] = await Auth.register(newUser);
        expect(savedUser).toEqual(1);
    });

    test('Can Login after registering', async () => {
        let registeredUser = {
            username: 'Test Icules',
            password: 'extremetorsion',
        };
        let loggedIn = await Auth.login(registeredUser);
        expect(loggedIn).toEqual(1);
    });
});
