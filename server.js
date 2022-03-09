const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const notesRouter = require("./routes/index");
const dataRouter = require("./routes/data");
const newRouter = require("./routes/new");
const deleteRouter = require("./routes/delete");
const emojiRouter = require("./routes/emoji");
const commentRouter = require("./routes/comment");
const loginRouter= require("./routes/login")
const registerRouter= require("./routes/register")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static(path.resolve(__dirname, "public")));

//handle all routes under notes
app.use("/", notesRouter);
app.use("/data", dataRouter);
app.use("/new", newRouter);
app.use("/delete", deleteRouter)
app.use("/emoji", emojiRouter);
app.use("/comment", commentRouter);
app.use("/login", loginRouter)
app.use("/register", registerRouter)


module.exports = app;
