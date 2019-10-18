const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const knexConfig = require('../database/dbConfig');
const sessionConfig = {
    name: 'session',
    secret: process.env.SESSION_SECRET || 'LaMbDaIsDaBoMb',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: knexConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    }),
};

server.use(helmet());
server.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);
server.use(express.json());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server engaged. Initiate Joke Sequence.',
    });
});

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.use((err, req, res, next) => {
    let { status, message } = err;
    res.status(status).json({ message });
});

module.exports = server;
