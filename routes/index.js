const express = require("express")
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) =>{
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file);
    console.log(name);
    if(name != 'index'){
        router.use(`/${name}`, require(`./${file}`)) //http:localhost:3000/api/nombredelarchivo
    }
})

module.exports = router