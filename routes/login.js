const express = require("express");
const router = express.Router();
const User= require('../model/userModel')
router.get("/", (req, res)=>{
    res.render('login.ejs')
})

router.post("/input", (req, res)=>{
    console.log(req.body.loginuser,req.body.loginpass)
    console.log
    res.send(JSON.stringify({username: req.body.loginuser, password: req.body.loginpass}))
})

module.exports =router;
