const {connect, sql} = require('../../config/database/index')
const dotenv = require('dotenv')
dotenv.config()

function userModle() {
    this.getnamebyid = async (id, callback) => {
        const pool = await connect
        var sqlString = `SELECT name FROM ${process.env.DB_USERADMS} WHERE id = @id`
        return await pool.request()
        .input('id', sql.Int ,id)
        .query(sqlString, (err, data) => {
            if (data.recordset.length > 0) {
                callback(null, data.recordset)
            }
            else {
                callback(true, null)
            }
        })
    }
    this.findbyid = async (id, callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_USERADMS} WHERE id = @id`
        return await pool.request()
        .input('id', sql.Int ,id)
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
        var sqlString = `INSERT INTO ${process.env.DB_USERADMS} (name, username, password, email, role) VALUES (@name, @username, @password, @email, @role)`
        return await pool.request()
        .input('name', sql.NVarChar, newdata.name)
        .input('username', sql.VarChar, newdata.username)
        .input('password', sql.VarChar, newdata.password)
        .input('email', sql.VarChar, newdata.email)
        .input('role', sql.VarChar, newdata.role)
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
    this.updatebyfirstlogin = async (id ,dataupdate, callback) => {
        const pool = await connect
        var sqlString = `UPDATE ${process.env.DB_USERADMS} SET password = @password, dateupdatepassword = @dateupdatepassword, firstlogin = 0 WHERE id = @id`
        return await pool.request()
        .input('id', sql.Int, id)
        .input('password', sql.VarChar, dataupdate.password)
        .input('dateupdatepassword', sql.SmallDateTime, dataupdate.dateupdatepassword)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Update object successfully !!!')
            }
        })
    }
    this.findidbyemail = async (mail, callback) => {
        const pool = await connect
        var sqlString = `SELECT id FROM ${process.env.DB_USERADMS} WHERE email = @email`
        return await pool.request()
        .input('email', sql.VarChar, mail)
        .query(sqlString, (err, data) => {
            if (data.recordset.length > 0) {
                callback(null, data.recordset)
            }
            else {
                callback(true, null)
            }
        })
    }
    this.upatedatereset = async (id ,dataupdate, callback) => {
        const pool = await connect
        var sqlString = `UPDATE ${process.env.DB_USERADMS} SET password = @password, dateupdatepassword = @dateupdatepassword WHERE id = @id`
        return await pool.request()
        .input('id', sql.Int, id)
        .input('password', sql.VarChar, dataupdate.password)
        .input('dateupdatepassword', sql.SmallDateTime, dataupdate.dateupdatepassword)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Update object successfully !!!')
            }
        })
    }
    this.findfirstloginbyid = async (id, callback) => {
        const pool = await connect
        var sqlString = `SELECT firstlogin FROM ${process.env.DB_USERADMS} WHERE id = @id`
        return await pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, (err, data) =>{
            if (data.recordset.length > 0) {
                callback(null, data.recordset)
            }
            else {
                callback(true, null)
            }
        })
    }
    this.remove = async (id, callback) => {
        const pool = await connect
        var sqlString = `DELETE FROM userADMS WHERE id = ${id}`
        return await pool.request()
        .query(sqlString, (err, data) =>{
            if (err) {
                callback(true, null)
            }
            else {
                callback(null, 'Thành công')
            }
        })
    }
    this.getusername = async (username, callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM userADMS WHERE username = ${username}`
        return await pool.request()
        .query(sqlString, (err, data) =>{
            if (err) {
                callback(true, null)
            }
            else {
                callback(null, data.recordset.length)
            }
        })
    }
    this.getemail = async (email, callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM userADMS WHERE email = @email`
        return await pool.request()
        .input('email',email)
        .query(sqlString, (err, data) =>{
            if (err) {
                callback(true, null)
            }
            else {
                callback(null, data.recordset.length)
            }
        })
    }
}

module.exports = new userModle