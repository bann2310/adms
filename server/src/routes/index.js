const siteRouter = require('./site.route')
const userRouter = require('./user.route')
const reportRouter = require('./report.route')
const viewRouter = require('./view.route')
const createRouter = require('./create.route')
const accountRouter = require('./account.route')
const Login_check = require('../app/middlewares/login.middleware')
const Role_check = require('../app/middlewares/role.middleware')

function route(app){
    app.use('/account', Login_check.checklogin_1, Role_check.check2, accountRouter)
    app.use('/view', Login_check.checklogin_1, viewRouter)
    app.use('/report', Login_check.checklogin_1, reportRouter)
    app.use('/create', Login_check.checklogin_1, createRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route