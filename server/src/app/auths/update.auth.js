const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const fs = require('fs')

const dotenv = require('dotenv')
dotenv.config()

const multer = require('multer')

const list_doc = {
    40: "BC",
    36: "CT",
    42: "CV",
    43: "HD",
    35: "KH",
    99: "KHLT",
    87: "QD",
    41: "TB",
    44: "TM",
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage }).single('input')

function generate_number(){
    const randomTenDigitNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    // console.log(randomSixDigitNumber);
    return randomTenDigitNumber
}

const Document = require('../models/document.model')

function Update (req, res, next) {
    this.add = (req, res, next) => {
        upload(req, res, function(err) {
            if (err) {
                console.log(err)
                res.send(err)
            }
            else {
                var newdata ={}
                if (req.file) {
                    var number = req.body.number
                    var number_save = generate_number()
                    var path = `${number < 10 ? '0' + number : number}-${list_doc[req.body.type]}.DTN-${number_save}.${req.file.filename.split('.').slice(-1)[0]}`
                    fs.renameSync(`./src/public/upload/${req.file.filename}`, `./src/public/upload/${path}`)
                    newdata = {
                        id: req.body.id,
                        namedoc: req.body.name,
                        number: req.body.number,
                        datedoc: req.body.date,
                        typedoc: req.body.type,
                        termdoc: req.body.term,
                        note: req.body.note,
                        filepri: path,
                        id_save: number_save,
                    }
                }
                else {
                    newdata = {
                        id: req.body.id,
                        namedoc: req.body.name,
                        number: req.body.number,
                        datedoc: req.body.date,
                        typedoc: req.body.type,
                        termdoc: req.body.term,
                        note: req.body.note,
                    }
                }
                Document.updata(newdata, async (err, result) => {
                    if (!err) {
                        res.redirect('/view')
                    }
                    else {
                        console.log("Create is error: ", err)
                        res.status(500).send('Server error responses')
                    }
                })
            }
        })
    }
}

module.exports = new Update