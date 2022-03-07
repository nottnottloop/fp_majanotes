const express = require("express");
const path = require("path");
const app = express();
var bodyParser = require('body-parser')

const notesRouter = require("./routes");
const dataRouter = require("./routes/data");
const newRouter = require("./routes/new");
const emojiRouter = require("./routes/emoji");
const commentRouter = require("./routes/comment");

//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.set("view engine", "ejs");

//root of site is the notes page, redirect correctly
<<<<<<< HEAD
app.get("/", (req, res) => {
    //res.redirect("/notes")
    res.render("notes/notes.ejs")
});
app.get("/new", (req, res)=>{
    res.render("notes/new.ejs")
})
app.post("/new", (req ,res)=>{
    console.log(req.body.note)
    
})
=======
app.get("/", (req, res) => res.render("index"));
>>>>>>> b624919b9f7bc4b369e368393f9ef01a4331c724
//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static(path.resolve(__dirname, "public")));

//handle all routes under notes
app.use("/", notesRouter);
app.use("/data", dataRouter);
app.use("/new", newRouter);
app.use("/emoji", emojiRouter);
app.use("/comment", commentRouter);

<<<<<<< HEAD
app.listen(3000, ()=> {
    console.log("Server listening on port 3000")
});
=======
app.listen(3000, ()=>{
    console.log("MajaNotes listening on port 3000")
});
>>>>>>> b624919b9f7bc4b369e368393f9ef01a4331c724
