const { usersModel } = require("../models")
const {handleHttpError} = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKeys = getProperties()


const authMiddleware = async (req, res, next) =>{
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res,"NOT_TOKEN",401)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res,"not_payload_data",401)
            return
        }
      
        const query = {
            [propertiesKeys.id] : dataToken[propertiesKeys.id]
        } 
        const user = await usersModel.findOne(query) // findOne existe en ambos motores
        //const user = await usersModel.findById(dataToken._id) aplica solo para mongodb
        req.user = user

        next()

    } catch (error) {
        handleHttpError(res,"Not_session", 401)
    }
}

module.exports = authMiddleware;