//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "This WebLog is for NIT JAMSHEDPUR, National Institute of Technology Jamshedpur (NIT Jamshedpur or NITJSR), is an Institute of National Importance located at Jamshedpur, Jharkhand, India. Established as a Regional Institute of Technology on 15 August 1960, it was upgraded to National Institute of Technology (NIT) on 27 December 2002 with the status of a Deemed University. It is one of the 31 NITs in India, and as such is directly under the control of the Ministry of Human Resource Development (MHRD). It is the third in the chain of 8 NITs established as a part of the Second Five Year Plan (1956–61) by the Government of India.";
const aboutContent = "National Institute of Technology Jamshedpur (NIT Jamshedpur or NITJSR), is an Institute of National Importance located at Jamshedpur, Jharkhand, India. Established as a Regional Institute of Technology on 15 August 1960, it was upgraded to National Institute of Technology (NIT) on 27 December 2002 with the status of a Deemed University. It is one of the 31 NITs in India, and as such is directly under the control of the Ministry of Human Resource Development (MHRD). It is the third in the chain of 8 NITs established as a part of the Second Five Year Plan (1956–61) by the Government of India.";
const contactContent = "National Institute of Technology, Jamshedpur , Jharkhand, India.  ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://SushantSingh:date123mm@examinationportal.lnpw9.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:title", function(req, res){

const requestedPostId = req.params.title;

  Post.findOne({title : requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
