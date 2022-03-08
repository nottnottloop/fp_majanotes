const express = require("express");
const router = express.Router();
router.get("/", (req, res)=>{
    res.render('register.ejs')
})

router.post("/input", (req, res)=>{
    console.log(req.body.reguser,req.body.regpass)
    res.send(JSON.stringify({username: req.body.reguser, password: req.body.regpass}))
})

module.exports =router;
