const authMiddleware = (req, res, next) => {
    //No hay nadie en las session ?? 
    if (!req.session.userLoged) { return res.redirect("/users/login") }
    next();
};

module.exports = authMiddleware;