const express = require("express")
const { dashBoard,login } = require("../Controller")
const router = express.Router()

//router.get("/login",login)
//router.get("/dashboard",dashBoard)
//we can also do 
router.route('/login').post(login)
router.route('/dashboard').get(dashBoard)


module.exports = router