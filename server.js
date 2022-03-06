const express = require("express");
const app = express();
const bodyParser= require("body-parser")

const notesRouter = require("./routes/notes");
const emojiRouter = require("./routes/emoji");

app.use(notesRouter)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");


module.exports=app;
