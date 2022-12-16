const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKeys = getProperties()

/**
 * Pasar el objeto del usuario, el que se envía para guardar en BD
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            [propertiesKeys.id]:user[propertiesKeys.id],
            role:user.role,
        },
        JWT_SECRET,
        {
            expiresIn:"2h"
        }
    );
    /*
    para un solo motor de BD
    const sign = jwt.sign(
        {
            _id:user._id,
            role:user.role,
        },
        JWT_SECRET,
        {
            expiresIn:"2h"
        }
    );*/
    return sign
}

/**
 * Pasar el token de sesión
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt,JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = {tokenSign, verifyToken}