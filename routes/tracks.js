const express = require("express")
const router = express.Router();
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks")
const customHeader = require("../middleware/customHeader")
const authMiddleware = require("../middleware/session")
const { checkRol } = require("../middleware/rol");
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/tracks");


//listar los items
router.get("/", authMiddleware, getItems)
//obtener detalle item
router.get("/:id", validatorGetItem, getItem)
//crear un item
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
//actualizar un item
router.put("/:id", validatorGetItem,validatorCreateItem, updateItem)
//Eliminar item
router.delete("/:id", validatorGetItem, deleteItem)





module.exports = router