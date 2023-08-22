const fs = require("fs")

const notFound = (req,res)=>{
    
    fs.readFile("./Data/notFound.html","utf8",(err,data)=>{
        if(err){
            console.log("error occured in reading file " + err);
            return
        }
        console.log(data);
        return res.status(404).send(data)
     })
}

module.exports = notFound