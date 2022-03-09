const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const newFunctions = require(path.resolve(__dirname, "new"));
const note = require(path.resolve(__dirname, "../model/noteModel"));
const constants = require(path.resolve(__dirname, "constants"));
const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));

router
  .route("/:id")
  .post((req, res) => { newFunctions.newNote(req, res, true); });

module.exports = router;
