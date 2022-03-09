const express = require("express");
const router = express.Router();
//const bodyParser=require("body-parser")
//router.use(bodyParser.json())

router.get("/", (req, res) => {
  res.render("index.ejs",{userData:""});
});

router.get("/guest", (req, res)=>{
  res.render("guest.ejs")
})




module.exports = router;
