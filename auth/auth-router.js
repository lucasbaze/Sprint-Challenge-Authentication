const router = require('express').Router();
const Auth = require('./auth-model');

router.post(
    '/register',
    registerReqs,
    takenUsername,
    async (req, res, next) => {
        let user = req.body;
        req.session.user = user;
        let createdUser = await Auth.register(user);
        res.status(200).json(createdUser);
    }
);

router.post('/login', loginReqs, async (req, res, next) => {
    let user = req.body; //
    console.log(user);
    let loggedIn = await Auth.login(user);
    console.log(loggedIn);
    if (loggedIn) {
        req.session.user = user;
        res.status(200).json({ message: 'Youre logged in' });
    } else {
        next({
            status: 401,
            message:
                'You shall not pass! Unauthorized, username or password incorrect',
        });
    }
});

//
//Registration Requirements
function registerReqs(req, res, next) {
    let user = req.body;

    if (!user.username) {
        next({
            status: 409,
            message: 'Missing Username',
        });
    }
    if (!user.password) {
        next({
            status: 409,
            message: 'Missing Password',
        });
    }

    if (user.password.length < 8) {
        next({
            status: 409,
            message: 'Password must be at least 8 chars',
        });
    }

    next();
}

//
//Checks if the username has already been taken
async function takenUsername(req, res, next) {
    let user = req.body;

    let username = await Auth.checkUsername(user.username);
    if (username) {
        next({ status: 401, message: 'Username is already taken' });
    }
    next();
}

//
//Checks if Login has username and password in body
function loginReqs(req, res, next) {
    let login = req.body;

    if (!login.username) {
        next({
            status: 409,
            message: 'Missing username',
        });
    }

    if (!login.password) {
        next({
            status: 409,
            message: 'Missing Password',
        });
    }

    next();
}

module.exports = router;
