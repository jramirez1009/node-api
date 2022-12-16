const express = require("express")
const router = express.Router();
const {validatorRegister, validatorLogin} = require("../validators/auth")
const {registerCtrl,loginCtrl} = require("../controllers/auth")

router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin,loginCtrl);

/*const express = require("express")
const {matchedData} = require("express-validator")
const {encrypt, compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt")
const router = express.Router();
const {validatorRegister, validatorLogin} = require("../validators/auth")
const {usersModel} = require("../models")*/

//http://localhost:3001/api/auth/login
//http://localhost:3001/api/auth/register

/*router.post("/register", validatorRegister, async (req,res)=>{
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
});*/



module.exports = router