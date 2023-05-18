const siteRouter = require('./site.route')
const userRouter = require('./user.route')

function route(app){
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route