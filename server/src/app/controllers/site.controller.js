class SiteControllers{
    // [GET] /
    home(req, res, next) {
        res.render('home')
    }
    homelogin(req, res, next) {
        res.send('<h1 style="text-align:center;">TRANG ĐĂNG NHẬP</h1><form method="POST" action="/login">   <label for="username">Username: </label>  <input type="text" id="username" name="username"/> <br/> <label for="password">Password: </label>  <input type="password" id="password" name="password"/> <br/>  <input type="checkbox" id="rememberpass" name="rememberpass"><label for="rememberpass">Remember password</label> <br/><a href="/forgot">Forggoten password?</a> <br/><button type="submit" id="logn">Login</button></form>')
    }
    homeforgot(req, res, next) {
        res.send('<h1 style="text-align:center;">Forgotten Password?</h1><form method="POST" action="/forgot"><label for="email">Email: </label>  <input type="email" id="email" name="email"/> <br/>  <button type="submit" id="confirm">Confirm</button></form>')
    }
}
module.exports = new SiteControllers