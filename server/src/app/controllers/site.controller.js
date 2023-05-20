class SiteControllers{
    // [GET] /
    home(req, res, next) {
        res.send('Welcome')
    }
    homelogin(req, res, next) {
        res.send('<form action="/login" method="post">' +
        'Username: <input name="username"><br>' +
        'Password: <input name="password" type="password"><br>' +
        '<input type="submit" text="Login"></form>')
    }
}
module.exports = new SiteControllers