const Report = require('../models/report.model')
const jwt = require('jsonwebtoken')
class ReportControllers{
    home(req, res, next) {
        res.render('report')
    }
    create(req, res, next) {
        const token = req.cookies.login
        var id = jwt.verify(token, process.env.SECRETKEY).id
        const newdata = {
            id_user: id,
            name: req.body.name,
            email: req.body.email,
            problem: req.body.problem,
            descrip: req.body.descrip,
        }
        Report.create(newdata, (err, data) => {
            if (err) console.log(err)
            res.redirect('/report')
        })
    }
    get(req, res, next) {
        Report.get((err, data) => {
            res.json(data)
        })
    }
}
module.exports = new ReportControllers