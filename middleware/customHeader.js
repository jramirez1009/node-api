const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers._api_key;
        if(apiKey === "jesus-123"){
            next();
        }else{
            res.status(403);
            res.send({"error":"ApiKey no es correcta."})    
        }
        
    } catch (error) {
        res.status(403);
        res.send({"error":"Algo_ocurrio_en_el_customh_header"})
    }
   
}
module.exports = customHeader;