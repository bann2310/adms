class SiteControllers{
    // [GET] /
    home(req, res, next) {
        res.render('home')
    }
    homelogin(req, res, next) {
        res.render('login')
    }
    homeforgot(req, res, next) {
        res.send('<h1 style="text-align:center;">Forgotten Password?</h1><form method="POST" action="/forgot"><label for="email">Email: </label>  <input type="email" id="email" name="email"/> <br/>  <button type="submit" id="confirm">Confirm</button></form>')
    }
}
module.exports = new SiteControllers