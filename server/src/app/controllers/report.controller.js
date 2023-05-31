class ReportControllers{
    home(req, res, next) {
        res.render('report')
    }
}
module.exports = new ReportControllers