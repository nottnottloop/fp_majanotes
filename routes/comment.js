const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

router.get("/:id", (req, res) => {
	res.render("comment");
});



module.exports = router;