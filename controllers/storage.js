const fs = require("fs")
const {storageModel} = require("../models")
const PUBLIC_URL = process.env.PUBLIC_URL; 
const MEDIA_PATH = `${__dirname}/../storage`; 

/**
 * Obtener lista de la BD 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req,res) => {
    try {
        const data  = await storageModel.find({})
        res.send({data}) //
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
        const data  = await storageModel.findById(id)
        res.send({data}) //
    } catch (error) {
        handleHttpError(res,"Error_getItem")
    }
};

/**
 * Insertar un rgistro a la BD 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req,res) => {
    try {
        //const body = req.body  esto es igual a :
        const {body, file} = req; // esto es destruccración
        const fileData = {
            filename: file.filename,
            url:`${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        console.log(data);
        res.send({data})
    } catch (error) {
        handleHttpError(res,"Error_createItem")
    }
};

/**
 * Actualizar un rgistro en la BD 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req,res) => {

};

/**
 * Eliminar un rgistro en la BD 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req,res) => {

    try {            
        const id =  req.params.id;        
        const dataFile  = await storageModel.findById(id)
        await storageModel.deleteOne({_id:id})
        const {filename} =  dataFile;
        const filepath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filepath)
        const data = {
            filepath,
            delete:1
        }
        res.send({data}) //
    } catch (error) {
        handleHttpError(res,"Error_delete")
    }

    //soft delete
   /* try {            
        const id =  req.params.id;        
        const dataFile  = await storageModel.findById(id)
        await storageModel.delete({_id:id})
        const {filename} =  dataFile;
        const filepath = `${MEDIA_PATH}/${filename}`
        //fs.unlinkSync(filepath)
        const data = {
            filepath,
            delete:1
        }
        res.send({data}) //
    } catch (error) {
        handleHttpError(res,"Error_getItem")
    }*/

};

module.exports =  {getItems, getItem, createItem, updateItem, deleteItem}