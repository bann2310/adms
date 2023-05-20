module.exports = (req, res, next) => {
    if (req.data.firstlogin != 1) { 
        res.redirect('/')
    } 
    else {
        res.send('<h1 style="text-align:center;">FIRST LOGIN</h1><form method="POST" action="/login/firstlogin"><label for="password">New password: </label>  <input type="password" id="password" name="password"/> <br/>  <label for="password">Confirm password: </label>  <input type="password" id="password_cf" name="password_cf"/> <br/><button type="submit" id="confirm">Confirm</button></form>')
    }
}