const mongoose=require('mongoose');

const blogSchema=mongoose.Schema({

    blogImage:{type:String,default:'1737815279660background-7276646_1280.jpg'},

    title:{type:String,required:true},

    content:{type:String,required:true},

    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}

},{timestamps:true})

const Blog=mongoose.model("Blog",blogSchema);

module.exports=Blog;