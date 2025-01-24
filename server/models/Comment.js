const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({

    comment:{type:String,required:true},

    blog:{type:mongoose.Schema.Types.ObjectId,ref:"Blog",required:true},

    username:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}

},{timestamps:true})

const Comment=mongoose.model("comment",commentSchema);

module.exports=Comment;