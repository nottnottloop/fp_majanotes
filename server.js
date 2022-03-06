const express = require("express");
const app = express();
const bodyParser= require("body-parser")

const notesRouter = require("./routes/notes");
const emojiRouter = require("./routes/emoji");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//root of site is the notes page, redirect correctly
app.get("/", (req, res) => {
    //res.redirect("/notes")
    res.render('notes/notes.ejs')
});
//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static("public"));
app.get("/new", (req ,res)=>{
    res.render('notes/new.ejs')
})
app.post("/new", (req, res)=>{
    console.log(req.body.note)
    res.send(req.body.note)
})
app.use("/notes/emoji", emojiRouter);

app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
});
