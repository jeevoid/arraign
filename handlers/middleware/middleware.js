const middleware = {};
middleware.Authenticate = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signup');
}

module.exports = middleware;