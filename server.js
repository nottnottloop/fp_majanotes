const express = require("express");
const path = require("path");
const app = express();

const notesRouter = require("./routes/notes");
const emojiRouter = require("./routes/emoji");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//root of site is the notes page, redirect correctly
app.get("/", (req, res) => res.render("notes"));
//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static(path.resolve(__dirname, "public")));

//handle all routes under notes
app.use("/", notesRouter);
app.use("/emoji", emojiRouter);

app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
});