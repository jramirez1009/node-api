const {check} = require("express-validator");
const validateResults = require("../utils/handleValidator")

/*
no se ncesita validar, dado que lo hacel el multer. 
const validatorCreateItem = [
   
];
*/

const validatorGetItem = [

    check("mediaId").exists().notEmpty(),
    (req,res,next) => {          
        return  validateResults(req.params.id,res,next)
    }
];
module.exports  = {validatorGetItem}