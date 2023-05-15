const Request = require('tedious').Request;
const Connection = require('tedious').Connection;
const TYPES = require('tedious').TYPES;

const dotenv = require('dotenv')
dotenv.config()

var config = {
    server: process.env.SERVER,
    authentication: {
      type: "default",
      options: {
        userName: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB
      }
    },
    options: {
      port: process.env.PROT_DB,
      database: process.env.DATABASE,
      trustServerCertificate: true
    }
  }

var connection = new Connection(config)
function connect(executeStatement){
    connection.on('connect', function(err) {
        if(err) {
          console.log('Error: ', err)
        }
        executeStatement();
    });
}

module.exports = connect

