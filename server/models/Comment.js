const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({

    comment:{type:String,required:true},

    blog:{type:mongoose.Schema.Types.ObjectId,ref:"Blog",required:true},

    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}

},{timestamps:true})

const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment;