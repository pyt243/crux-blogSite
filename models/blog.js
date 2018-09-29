var mongoose = require("mongoose");
var blogScheme = new mongoose.Schema({
  title:String,
  content:String,
  comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Coment"
  }],
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
});
module.exports = mongoose.model("Blog",blogScheme);
