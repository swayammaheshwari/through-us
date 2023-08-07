//jshint esversion:6
require("dotenv").config();
const express = require("express");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const nodemailer = require("nodemailer");

const app = express();

const d = new Date().toLocaleDateString();

const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.office365.com",
  auth: {
    user: "dev.swayam@outlook.com",
    pass: process.env.PASSWORD,
  },
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const blogSchema = {
  author: String,
  title: String,
  poster: String,
  date: String,
  image: Number,
};

const contactSchema = {
  name: String,
  email: String,
  message: String,
};
const photoSchema = {
  title: String,
  url: String,
};

const Post = mongoose.model("Post", blogSchema);
const Line = mongoose.model("line", blogSchema);
const Contact = mongoose.model("contact", contactSchema);
const AIphoto = mongoose.model("photo", photoSchema);

app.get("/", (req, res) => {
  Post.find({}, function (err, posts) {
    Line.find({}, function (err, lines) {
      res.render("index", { lines: lines, posts: posts });
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////
app.get("/photoUpload", (req, res) => {
  AIphoto.find({}, (err, url) => {
    res.render("photoUpload", { photos: url });
  });
});

app.post("/photoUpload", (req, res) => {
  const photo = new AIphoto({
    title: req.body.title,
    url: req.body.url,
  });
  photo.save();
});

let all = [];
app.post("/sample", (req, res) => {
  let payload = req.body.payload;
  payload = payload.filter(Boolean);
  payload = [...new Set(payload)];
  payload.forEach((element) => {
    AIphoto.find(
      { title: { $regex: element, $options: "i" } },
      function (err, url) {
        url.forEach((url) => {
          all.push(url.url);
        });
      }
    );
  });
  all = all.filter(Boolean);
  all = [...new Set(all)];
  res.send({ payload: all });
  all = [];
});
///////////////////////////////////////////////////////////////////////////

app.post("/compose", (req, res) => {
  let t = Math.floor(Math.random() * 1000) + 1; //integer from 1 to 1000

  const post = new Post({
    author: req.body.authorNameR,
    title: req.body.postTitleR,
    poster: req.body.postBodyR,
    date: d,
    image: t,
  });
  post.save();
  res.redirect("/");
});

app.post("/composeLine", (req, res) => {
  const line = new Line({
    author: req.body.authorLine,
    poster: req.body.bodyLine,
    date: d,
  });
  line.save();
  res.redirect("/");
});

app.get("/author", (req, res) => {
  Post.find(
    { author: ["swayam maheshwari", "Swayam Maheshwari"] },
    (err, posts) => {
      res.render("author", { posts: posts });
    }
  );
});

app.get("/post/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      author: post.author,
      title: post.title,
      poster: post.poster,
      date: post.date,
      image: post.image,
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (!err) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/compose");
      });
    }
  });
});

app.get("/Contact", (req, res) => {
  res.render("Contact Us");
});

app.post("/Contact", (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  contact.save();

  const mailData = {
    from: "dev.swayam@outlook.com",
    to: "arjunsinghlahor189@gmail.com",
    subject: req.body.name,
    text: `Email: ${req.body.email}\nmessage: ${req.body.message}`,
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
  res.redirect("/");
});

app.get("/compose", (req, res) => {
  let user = req.query.user;
  if (req.isAuthenticated()) {
    res.render("compose2");
  } else {
    res.redirect("/login");
  }
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const mailData = {
    from: "dev.swayam@outlook.com",
    to: req.body.username,
    subject: "Thank you to become a member!",
    html: { path: __dirname + "/views/members.ejs" },
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/compose");
        });
      }
    }
  );
});

app.listen(process.env.PORT, function () {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
