const {matchedData} = require("express-validator");
const {tracksModel} = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * Obtener lista de la BD 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req,res) => {
    const user = req.user // esto sale desde el middleware de session, se añade después de validar token.
    try {
        const data  = await tracksModel.find({})
        res.send({data,user}) //
    } catch (error) {
        handleHttpError(res,"Error_get_items")
    }
   
};

/**
 * Obtener un detalle de la BD 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req,res) => {   
 
    try {            
        const id =  req.params.id; 
        console.log(id);
        const data  = await tracksModel.findById(id)
        res.send({data}) //
    } catch (error) {
        handleHttpError(res,"Error_detalle")
    }
};

/**
 * Insertar un rgistro a la BD 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req,res) => {
    //const body = req.body  esto es igual a :
    try {
       // const {body} = req; // esto es destruccración
      //  const data = await tracksModel.create(body)     
      //  res.send({data})
      console.log(req.body);
      const body = matchedData(req)
      const data = await tracksModel.create(body)     
      res.send({data})
    } catch (error) {
        handleHttpError(res,"Error_create_items")
    }
};

/**
 * Actualizar un rgistro en la BD 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req,res) => {
   
     try {  
       const {id, ...body} = matchedData(req) 
       const data = await tracksModel.findOneAndUpdate(
        id,
        body
       )     
       res.send({data})
     } catch (error) {
         handleHttpError(res,"Error_update_items")
     }
};

/**
 * Eliminar un rgistro en la BD 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req,res) => {
    try {            
        const id =  req.params.id; 
        console.log(id);
       // const data  = await tracksModel.deleteOne({_id:id}) borrado físico
       const data  = await tracksModel.delete({_id:id}) //borrado lógico
        res.send({data}) //
    } catch (error) {
        handleHttpError(res,"Error_eliminar")
    }
};

module.exports =  {getItems, getItem, createItem, updateItem, deleteItem}