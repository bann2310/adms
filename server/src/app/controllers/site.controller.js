class SiteControllers{
    // [GET] /
    home(req, res, next) {
        res.render('home')
    }
    homelogin(req, res, next) {
        res.render('login')
    }
    homefirst(req, res, next) {
        res.render('firstlogin')
    }
    homeforgot(req, res, next) {
        res.render('forgot')
    }
    homecode(req, res, next) {
        res.render('code')
    }
    homereset(req, res, next) {
        res.render('reset')
    }
}
module.exports = new SiteControllers