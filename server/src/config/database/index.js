const dotenv = require('dotenv')
dotenv.config()

const sql = require('mssql')

const sqlConfig = {
    server: process.env.SERVER,
    authentication: {
      type: "default",
      options: {
        userName: process.env.DB_USER,
        password: process.env.DB_PWD
      }
    },
    options: {
      port: 1433,
      database: process.env.DB_NAME,
      trustServerCertificate: true
    }
}
const connect = new sql.ConnectionPool(sqlConfig).connect().then(pool => {return pool})
.catch(err => {
    console.log("err connect db: ", err)
})

module.exports = {connect, sql}

