const mongoose = require("mongoose")

const connectToDb = (dbUri)=>{
    return mongoose.connect(dbUri)
}

module.exports = connectToDb