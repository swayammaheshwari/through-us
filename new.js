//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash")
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index",{author: authorName, title : postTitle, post:postBody});
})

app.post("/compose",(req,res)=>{
  const authorName = req.body.authorNameR;
  const postTitle = req.body.postTitleR;
  const postBody = req.body.postBodyR;

  res.redirect("/")
})
app.get("/author",(req,res)=>{
    res.render("author");
})
app.get("/post",(req,res)=>{
    res.render("post");
})
app.get("/compose",(req,res)=>{
    res.render("compose");
})














let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});