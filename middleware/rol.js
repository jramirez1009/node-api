const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} roles 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) =>{
   try {
        const {user} = req; 
        console.log(user);
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))  //tru o false
        if(!checkValueRol){
            handleHttpError(res,"User not permission", 403)
            return
        }
        next()
   } catch (error) {
        handleHttpError(res,"Error permission", 403)
        return
   }
}
module.exports = {checkRol}