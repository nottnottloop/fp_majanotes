const express = require("express");
const path = require("path");
const app = express();

const notesRouter = require("./routes");
const dataRouter = require("./routes/data");
const newRouter = require("./routes/new");
const emojiRouter = require("./routes/emoji");
const commentRouter = require("./routes/comment");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static(path.resolve(__dirname, "public")));

//handle all routes under notes
app.use("/", notesRouter);
app.use("/data", dataRouter);
app.use("/new", newRouter);
app.use("/emoji", emojiRouter);
app.use("/comment", commentRouter);



module.exports=app;
