const Create = require('../auths/create.auth')

class CreateControllers{
    home(req, res, next) {
        res.render('create')
    }
    add(req, res, next) {
        Create.add(req, res, next)
    }
}
module.exports = new CreateControllers