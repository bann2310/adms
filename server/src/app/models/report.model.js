const {connect, sql} = require('../../config/database/index')
const dotenv = require('dotenv')
dotenv.config()

function reportModle() {
    this.create = async (newdata, callback) => {
        const pool = await connect
        var sqlString = `INSERT INTO ${process.env.DB_REPORTADMS} (id_user, name, email, problem, descrip) VALUES (@id_user, @name, @email, @problem, @descrip)`
        return await pool.request()
        .input('id_user', sql.Int, newdata.id_user)
        .input('name', sql.NVarChar, newdata.name)
        .input('email', sql.NVarChar, newdata.email)
        .input('problem', sql.NVarChar, newdata.problem)
        .input('descrip', sql.NVarChar, newdata.descrip)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Create object successfully !!!')
            }
        })
    }
    this.get = async (callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_REPORTADMS}`
        return await pool.request()
        .query(sqlString, (err, data) => {
            if (data.recordset.length > 0) {
                callback(null, data.recordset)
            }
            else {
                callback(true, null)
            }
        })
    }
}

module.exports = new reportModle