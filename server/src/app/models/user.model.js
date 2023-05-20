const connect = require('../../config/database/index')
const dotenv = require('dotenv')
dotenv.config()

function userModle() {
    this.findbyid = async (id, callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_USERADMS} WHERE id = @id`
        return await pool.request()
        .input('id', id)
        .query(sqlString, (err, data) => {
            if (data.recordset.length > 0) {
                callback(null, data.recordset)
            }
            else {
                callback(true, null)
            }
        })
    }
    this.create = async (newdata, callback) => {
        const pool = await connect
        var sqlString = `INSERT INTO ${process.env.DB_USERADMS} (username, password, email, role) VALUES (@username, @password, @email, @role)`
        return await pool.request()
        .input('username', newdata.username)
        .input('password', newdata.password)
        .input('email', newdata.email)
        .input('role', newdata.role)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Create object successfully !!!')
            }
        })
    }
    this.find = async (callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_USERADMS}`
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
    this.findAll = async (where, datafind, callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_USERADMS} WHERE ${where} = ${datafind[where]}`
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
    this.updatebyid = async (id ,dataupdate, callback) => {
        const pool = await connect
        var sqlString = `UPDATE ${process.env.DB_USERADMS} SET password = @password, dateupdatepassword = @dateupdatepassword, firstlogin = 0 WHERE id = @id`
        return await pool.request()
        .input('password', dataupdate.password)
        .input('dateupdatepassword', dataupdate.dateupdatepassword)
        .input('id', id)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Update object successfully !!!')
            }
        })
    }
}

module.exports = new userModle