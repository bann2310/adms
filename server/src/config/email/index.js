const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    MAILER: process.env.EM_MAILER,
    HOST: process.env.EM_HOST,
    PORT: +process.env.EM_PORT,
    USERNAME: process.env.EM_USERNAME,
    PASSWORD: process.env.EM_PASSWORD,
    ENCRYTION: process.env.EM_ENCRYTION,
    FROM_ADDRESS: process.env.EM_FROM_ADDRESS,
    FORM_NAME: process.env.EM_FORM_NAME
}