
const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const {validatorGetItem} = require("../validators/storage")
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/storage")

//listar archivos
router.get("/", getItems)
//obtener un archivo
router.get("/:id", validatorGetItem, getItem)
//eliminar un archivo
router.delete("/:id", validatorGetItem, deleteItem)
//subir un archivo
router.post("/", uploadMiddleware.single("myfile") ,createItem)

module.exports =  router