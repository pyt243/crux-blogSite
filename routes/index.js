var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Coment = require("../models/comments");
var mongoose = require("mongoose");
router.get("/",function(req,res){
  res.render("home.ejs",{post:false});
});
router.post("/blog/new",function(req,res){
  var obj = {
    title:req.body.title,
    content:req.body.content,
    author:{id:req.user._id,username:req.user.username}
  };
  Blog.create(obj,function(err,cb){
    if(err){
      console.log("error");
      res.redirect("back");
    }
    else {
      var st ="/blog/" + cb._id;
      res.render("home.ejs",{post:true,st:st});
    }
  });
});
router.get("/blog",isLoggedIn,function(req,res){
  Blog.find({},function(err,blogs){
    if(err){
      console.log(err);
      res.redirect('/');
    }else{
      function compare(a,b){
        if(a.likes.length<b.likes.length)
          return 1;
        if(a.likes.length>b.likes.length)
          return -1;
        return 0;
      }
      blogs.sort(compare);
      res.render("show.ejs",{blogs:blogs});
    }
  })
});
router.get("/blog/:id",isLoggedIn,function(req,res){
  Blog.findById(req.params.id).populate("comments").exec(function(err,fb){
    if(err){
      console.log(err);
      res.redirect("back");
    }else {
      res.render("indBlog.ejs",{blog:fb});
    }
  });
});
router.post("/commentNew",function(req,res){
  var obj = req.body;
  console.log(obj);
  Blog.findById(obj.b_id,function(err,fb){
      if(err){
        redirect("back");
      }else {
        Coment.create({text:obj.text},function(err,fc){
          fc.author.username=obj.currentUser.username;
          fc.author.id=obj.currentUser._id;
          fc.save();
          fb.comments.push(fc);
          fb.save();
          res.send(fc._id);
        });
      }
  });
});
router.post("/like",function(req,res){
  var obj = req.body;
  Blog.findById(obj.b_id).populate("likes").exec(function(err,fb){
    if(err){
      console.log("error");
    }else {
    //  var o = {id:obj.currentUser._id};
      fb.likes.push(obj.currentUser._id);
      fb.save();
      res.send("liked successfully");
    }
  });
});
router.post("/unlike",function(req,res){
  var obj = req.body;
  Blog.findById(obj.b_id).populate("likes").exec(function(err,fb){
    if(err){
      console.log("error");
    }else {
    //  var o = {id:obj.currentUser._id};
    var index = fb.likes.indexOf(obj.currentUser._id);
    fb.likes.splice(index,1);
    fb.save();
    res.send("unliked");
    }
  });
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
  return next();
  }
  else{
    res.redirect("/login");
  }
}
module.exports = router;
