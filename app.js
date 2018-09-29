var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var indexRoutes = require("./routes/index");
var authRoutes = require("./routes/auth");
var User = require("./models/user");
app.use(express.static("public"));
app.listen(2000,"127.0.0.1",function(){
  console.log("server has started");
});
mongoose.connect("mongodb://localhost/blog");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:"secret message",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});
app.use(indexRoutes);
app.use(authRoutes);
