const express = require("express");
const app = express();
var bodyParser = require('body-parser')

const notesRouter = require("./routes/notes");

//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.set("view engine", "ejs");

//root of site is the notes page, redirect correctly
app.get("/", (req, res) => {
    //res.redirect("/notes")
    res.render("notes/notes.ejs")
});
app.get("/new", (req, res)=>{
    res.render("notes/new")
})
app.post("/new", (req ,res)=>{
    console.log(req.body.note)
    
})
//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static("public"));

//handle all routes under notes
app.use("/notes", notesRouter);

app.listen(3000, ()=> {
    console.log("Server listening on port 3000")
});
