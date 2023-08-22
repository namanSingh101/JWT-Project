const connectToDb = require("./DbConnect");
const {configDotenv} = require("dotenv");
const express = require("express");
const mainRouter = require("./Routes/index");
const notFound = require("./Middleware/notFound");
const errorHandler = require("./Middleware/error-handler")
const express_async_errors = require("express-async-errors")


configDotenv()
const app = express()
const dbUri = process.env.DbUri
const port = process.env.PORT
//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use("/api/v1",mainRouter)

app.use(notFound)
app.use(errorHandler)


const start = async () =>{
    try {
        app.listen(port,()=>{console.log("app is listening on port 3001");})
    } catch (error) {
        console.log("Error occcured " + error);
    }
}

start ()
