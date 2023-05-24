// dotenv
const dotenv = require('dotenv')
dotenv.config()

// express
const express = require('express')
const app = express()

// static
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// handlebars
const hbs = require('express-handlebars')
app.engine('hbs', hbs.engine({
  extname:".hbs"
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// define port
const port = process.env.PORT

// body-parser
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

// cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// route
const route = require('./routes/index')
route(app)

// bcrypt
const bcrypt = require('bcrypt')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, webserver: http://localhost:${port}`)
})