const {matchedData} = require("express-validator")
const {encrypt, compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt")
const {usersModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")

const registerCtrl = async (req,res)=>{

    try {
    req = matchedData(req);
    const password = await encrypt(req.password)
    const body = {...req, password}
    const dataUser = await usersModel.create(body)
    dataUser.set("password",undefined, {"strict":false}) // para cuando se cree el usuario no retone la contraseña
    const data = {
        token: await tokenSign(dataUser),
        user:dataUser
    }
    res.send({data}) 
} catch (error) {
    handleHttpError(res, "Error_register_user")
}
}

const loginCtrl = async (req, res) => {
    ///console.log(req);
    try {
        req = matchedData(req);
    /*  
    solo para mongo
      const user = await usersModel.findOne({email:req.email})
        .select('password name role email')
        */
    const user = await usersModel.findOne({email:req.email})   //para amabos motores de bd
   
        if(!user){
            handleHttpError(res, "User_not_exists", 404)
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password,hashPassword)
        if(!check){
            handleHttpError(res, "Password_invalid", 401)
        }

        const data  = {
            token : await tokenSign(user),
            user
        }
        user.set('password', undefined, {strict:false})
        res.send(data)

    } catch (error) {
        handleHttpError(res, "Error_login_user")
    }
}

module.exports = {registerCtrl,loginCtrl}