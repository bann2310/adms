const {connect, sql} = require('../../config/database/index')
const dotenv = require('dotenv')
dotenv.config()

function doucumentModle() {
    this.create = async (newdata, callback) => {
        const pool = await connect
        var sqlString = `INSERT INTO ${process.env.DB_DOCUMENTADMS} (number, namedoc, datedoc, typedoc, termdoc, note, filepri, id_save) VALUES (@number, @namedoc, @datedoc, @typedoc, @termdoc, @note, @filepri, @id_save)`
        return await pool.request()
        .input('number',sql.Int,newdata.number)    
        .input('namedoc',sql.NVarChar,newdata.namedoc)    
        .input('datedoc',sql.SmallDateTime,newdata.datedoc)    
        .input('typedoc',sql.Int,newdata.typedoc)    
        .input('termdoc',sql.VarChar,newdata.termdoc)    
        .input('note',sql.NVarChar,newdata.note)    
        .input('filepri',sql.NVarChar,newdata.filepri)
        .input('id_save',sql.BigInt,newdata.id_save)
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'Create object successfully !!!')
            }
        })
    }
    this.getdatabyid = async (id ,callback) => {
        const pool = await connect
        var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS} WHERE id = ${id}`
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
    this.getdata = async (req ,callback) => {
        const pool = await connect
        if (req.type) {
            var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS} WHERE typedoc = ${req.type}`
            // console.log(sqlString)
        }
        else {
            var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS}`
            // console.log(sqlString)
        }
        // console.log(sqlString)
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
    this.getamount = async (req, callback) => {
        const pool = await connect
        if (req.type) {
            var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS} WHERE typedoc = ${req.type}`
            // console.log(sqlString)
        }
        else {
            var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS}`
            // console.log(sqlString)
        }
        // console.log(sqlString)
        return await pool.request()
        .query(sqlString, (err, data) => {
            if (data.recordset.length > 0) {
                callback(null, data.recordset.length)
            }
            else {
                callback(true, null)
            }
        })
    }
    this.getsearch = async (key, callback) => {
        const pool = await connect
        // console.log(key)
        if (key.type) {
            var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS} WHERE typedoc = ${key.type} AND (namedoc LIKE '%${key.keyword}%' OR number LIKE '%${key.keyword}%')`
        }
        else {
            var sqlString = `SELECT * FROM ${process.env.DB_DOCUMENTADMS} WHERE (namedoc LIKE '%${key.keyword}%' OR number LIKE '%${key.keyword}%')`
        }
        // console.log(sqlString)
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
    this.updata = async (newdata, callback) => {
        if (newdata.filepri)
        {
            const pool = await connect
            var sqlString = `UPDATE ${process.env.DB_DOCUMENTADMS} SET number=@number, namedoc=@namedoc, datedoc=@datedoc, typedoc=@typedoc, termdoc=@termdoc, note=@note, filepri=@filepri, id_save=@id_save WHERE id=@id`
            return await pool.request()
            .input('id',sql.Int,newdata.id)
            .input('number',sql.Int,newdata.number)    
            .input('namedoc',sql.NVarChar,newdata.namedoc)    
            .input('datedoc',sql.SmallDateTime,newdata.datedoc)    
            .input('typedoc',sql.Int,newdata.typedoc)    
            .input('termdoc',sql.VarChar,newdata.termdoc)    
            .input('note',sql.NVarChar,newdata.note)    
            .input('filepri',sql.NVarChar,newdata.filepri)
            .input('id_save',sql.BigInt,newdata.id_save)
            .query(sqlString, (err, data) => {
                if (err) {
                    callback(err, null)
                }
                else {
                    callback(null, 'Update object successfully !!!')
                }
            })
        }
        else {
            const pool = await connect
            var sqlString = `UPDATE ${process.env.DB_DOCUMENTADMS} SET number=@number, namedoc=@namedoc, datedoc=@datedoc, typedoc=@typedoc, termdoc=@termdoc, note=@note WHERE id=@id`
            console.log(sqlString)
            return await pool.request()
            .input('id',sql.Int,newdata.id)
            .input('number',sql.Int,newdata.number)    
            .input('namedoc',sql.NVarChar,newdata.namedoc)    
            .input('datedoc',sql.SmallDateTime,newdata.datedoc)    
            .input('typedoc',sql.Int,newdata.typedoc)    
            .input('termdoc',sql.VarChar,newdata.termdoc)    
            .input('note',sql.NVarChar,newdata.note) 
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
    this.deletebyid = async (id, callback) => {
        const pool = await connect
        var sqlString = `DELETE FROM ${process.env.DB_DOCUMENTADMS} WHERE id=${id};`
        return await pool.request()
        .query(sqlString, (err, data) => {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, 'successfully !!!')
            }
        })
    }
}

module.exports = new doucumentModle