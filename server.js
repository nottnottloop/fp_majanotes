const express = require("express");
const app = express();

const notesRouter = require("./routes/notes");

//app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.redirect("/notes"));
app.use("/notes", notesRouter);

app.listen(3000);
