const {connect, sql} = require('../../config/database/index')
const dotenv = require('dotenv')
dotenv.config()

function loginModle() {
    this.create = async (newdata, callback) => {
        const pool = await connect
        var sqlString = `INSERT INTO ${process.env.DB_LOGINADMS} (username, timelogin, statuslogin) VALUES (@username, @timelogin, @statuslogin)`
        return await pool.request()
        .input('username', newdata.username)
        .input('timelogin', newdata.timelogin)
        .input('statuslogin', newdata.statuslogin)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Create object successfully !!!')
            }
        })
    }
    this.delete = async (username, callback) => {
        const pool = await connect
        var sqlString = `DELETE FROM ${process.env.DB_LOGINADMS} WHERE username = @username`
        return await pool.request()
        .input('username', username)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Delete object successfully !!!')
            }
        })
    }
    this.gettimeslogin = async (username, callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_LOGINADMS} WHERE username = @username`
        return await pool.request()
        .input('username', username)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data.recordset)
            }
        })
    }
}

module.exports = new loginModle