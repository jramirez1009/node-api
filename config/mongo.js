const mongoose = require("mongoose")
const dbConnect = () =>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err,res) =>{
        if(!err){
            console.log('Conexión exitosa!');
        }else{
            console.log('Conexión fallida!');
        }
    })
}
module.exports = dbConnect