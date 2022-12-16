const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
//select:false sirve para cuando hagan una busqueda , muestre o no ese atributo.
const UserScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            select:false
        },
        role:{
            type:["user","admin"],
            default:"user"
        }
    },
    {
       timestamps:true, //todo createdAt, updatedAt
       versionKey:false
    }
)

UserScheme.plugin(mongooseDelete, {overrideMethods:"all"});
module.exports = mongoose.model("users",UserScheme)