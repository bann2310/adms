const siteRouter = require('./site.route')
const userRouter = require('./user.route')
const reportRouter = require('./report.route')

function route(app){
    app.use('/report', reportRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route