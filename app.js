
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morganBody = require("morgan-body")

const loggerStream = require("./utils/handleLogger")
const dbConnect = require('./config/mongo')
const {dbConnectMySql} = require("./config/mysql")
const app = express()

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

morganBody(app,{
    noColors:true,
    stream:loggerStream,
    skpi:function(req,res){
        return res.statusCode < 400 //no enviar cuando sea un código de respuesta 2xx o 3xx
    }
})
const port = process.env.PORT || 3000

app.use("/api",require("./routes/"))

app.listen(port, () =>{
    console.log('app:'+ port);
});

(ENGINE_DB === 'nosql') ? dbConnect() : dbConnectMySql();
