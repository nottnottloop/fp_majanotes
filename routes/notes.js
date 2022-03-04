const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("notes/notes");
});

router.get("/new", (req, res) => {
  res.render("notes/new");
});

//router
//  .route("/:id")
//  .get((req, res) => {
//    res.send(req.params.id);
//  });

//this code is ran every time a router matches this sort of call. for reference
//router.param("id", (req, res, next, id) => {
//  req.user = users[id];
//  next();
//});

module.exports = router;
