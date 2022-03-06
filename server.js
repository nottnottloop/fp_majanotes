const express = require("express");
const app = express();
const path= require('path');
const notesRouter = require("./routes/notes");
const emojiRouter = require("./routes/emoji");
app.use(express.static(path.join(__dirname,'/public'))) //We need this line to correctly serve our public folder
app.use(notesRouter)
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");


module.exports=app;
