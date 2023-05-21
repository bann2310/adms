const nodeMailer = require('nodemailer')
const mailConfig = require('../../config/email/index')

function sendMail(to, subject, htmlContent){
    const transporter = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
          user: mailConfig.USERNAME,
          pass: mailConfig.PASSWORD,
        },
    })

    const options = {
        form: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }

    return transporter.sendMail(options)
}

module.exports = sendMail