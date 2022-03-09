const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));

router
  .route("/:id")
  .post((req, res) => { sharedFunctions.newNote(req, res, true); });

module.exports = router;
