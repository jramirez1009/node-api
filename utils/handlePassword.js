const bcryptjs = require("bcryptjs");

/**
 * texto plano como se escibe la contraseña
 * @param {*} passwordTexto  
 */
const encrypt = async (passwordTexto)=> {
    const hash = await bcryptjs.hash(passwordTexto, 10)
    return hash 
}
/**
 * pasar contraseña sn encriptr y sin encriptar
 * @param {*} passwordTexto 
 * @param {*} hashPassword 
 */
const compare = async (passwordTexto, hashPassword) => {
    return await bcryptjs.hash(passwordTexto, hashPassword)
}

module.exports = {encrypt, compare}