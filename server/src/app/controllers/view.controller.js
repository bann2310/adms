const Document = require('../models/document.model')

const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
app.use(cookieParser())

const Update = require('../auths/update.auth')


const fs = require('fs')

class ViewControllers{
    home(req, res, next) {
        res.render('view')
    }
    detail(req, res, next) {
        res.render('detail')
    }
    getalldata(req, res, next) {
        var request = {
            type: req.query.type=='none' || req.query.type == undefined || req.query.type=='null'?null:parseInt(req.query.type),
        }
        res.cookie('view', request, {
            httpOnly: false,
            secure: true
        })
        const value1 = (req.query.page - 1) * 5
        const value2 = req.query.page * 5
        // console.log(request)
        Document.getdata(request, (err, data) => {
            res.json(data.slice(value1, value2))
        })
    }
    getamount(req, res, next) {
        var request = {
            type: req.query.type=='none' || req.query.type == undefined || req.query.type=='null'?null:parseInt(req.query.type),
        }
        // console.log(typeof(request.type))
        Document.getamount(request, (err, data) => {
            res.json(data)
        })
    }
    download(req, res, next) {
        res.download(`./src/public/upload/${req.params.f}`)
    }
    search(req, res, next) {
        var key = {
            keyword: req.query.keyword == undefined?'':req.query.keyword,
            type: req.query.type=='none' || req.query.type == undefined || req.query.type=='null'?null:parseInt(req.query.type),
        }
        // console.log(key)
        Document.getsearch(key, (err, data) =>{
            res.json(data)
        })
    }
    getdata(req, res, next) {
        var id = req.params.id
        Document.getdatabyid(id, (err, data) => {
            res.json(data)
        })
    }
    update(req,res,next){
        Update.add(req,res,next)
    }
    delete_(req, res, next) {
        Document.getdata(req.params.id, (err, result) => {
            fs.unlink(`./src/public/upload/${result[0].filepri}`, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
            })
            Document.deletebyid(req.params.id, (err, result) => {
                res.redirect('/view')
            })
        })  
    }
}
module.exports = new ViewControllers