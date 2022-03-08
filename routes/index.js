const express = require("express");
const router = express.Router();
//const bodyParser=require("body-parser")
//router.use(bodyParser.json())

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/loggedout", (req, res)=>{
  res.send("Logged out")

})



module.exports = router;
