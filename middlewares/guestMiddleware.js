const guestMiddleware = (req, res, next) => {
    //Alguien en session??
    if (req.session.userLoged) { return res.redirect("/users/profile") }
    next();

}

module.exports = guestMiddleware;