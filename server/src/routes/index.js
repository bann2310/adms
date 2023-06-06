const siteRouter = require('./site.route')
const userRouter = require('./user.route')
const reportRouter = require('./report.route')
const viewRouter = require('./view.route')
const createRouter = require('./create.route')
const Login_check = require('../app/middlewares/login.middleware')

function route(app){
    app.use('/view', Login_check.checklogin_1, viewRouter)
    app.use('/report', Login_check.checklogin_1, reportRouter)
    app.use('/create', Login_check.checklogin_1, createRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route