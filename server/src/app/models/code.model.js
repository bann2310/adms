const {connect, sql} = require('../../config/database/index')
const dotenv = require('dotenv')
dotenv.config()

function codeModle() {
    this.create = async (newdata, callback) => {
        const pool = await connect
        var sqlString = `INSERT INTO ${process.env.DB_CODEADMS} (id_user, email, code, prod, expire) VALUES (@id_user, @email, @code, @prod, @expire)`
        return await pool.request()
        .input('id_user', newdata.id_user)
        .input('code', newdata.code)
        .input('email', newdata.email)
        .input('prod', newdata.prod)
        .input('expire',newdata.expire)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Create object successfully !!!')
            }
        })
    }
    this.delete = async (id, callback) => {
        const pool = await connect
        var sqlString = `DELETE FROM ${process.env.DB_CODEADMS} WHERE id_user = @id_user`
        return await pool.request()
        .input('id_user', id)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Delete object successfully !!!')
            }
        })
    }
    this.getcodebyid = async (id, callback) => {
        const pool = await connect
        var sqlString = `SELECT code FROM ${process.env.DB_CODEADMS} WHERE id_user = @id_user`
        return await pool.request()
        .input('id_user', id)
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

module.exports = new codeModle