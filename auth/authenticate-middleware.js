/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        next({
            status: 401,
            message: 'Not logged in. Please do so',
        });
    }
};
