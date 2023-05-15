class SiteControllers{
    // [GET] /
    home(req, res){
        res.send('Welcome')
    }
}
module.exports = new SiteControllers