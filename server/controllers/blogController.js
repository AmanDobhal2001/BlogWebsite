const blog = require('stream');
const Blog = require('../models/Blog');
const Comment=require('../models/Comment');

showBlog = async (req, res) => {
    try {

        const blog = Blog.find().populate('author', 'userName').cursor();

        res.write('[');

        let first = true;

        blog.on('data', (chunk) => {
            if (!first) {
                res.write(',');
            }
            res.write(JSON.stringify(chunk));
            first = false;
        })

        blog.on('end', () => {
            res.write(']');
            res.end();
        })

        blog.on('error', (err) => {
            res.status(500).json({ error: "Internal server error" });
        })
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}


showOnlyBlog = async (req, res) => {
    try {
        const id = req.params.blog_id;

        const blog = await Blog.findOne({ _id: id }).populate('author', 'userName');
        res.status(200).json({ blog });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}

addBlog = async (req, res) => {

    try {
        const author = req.user_Id;
        const { title, content } = req.body;

        const blogImage = req.file ? req.file.filename : undefined;

        const blog = new Blog({ blogImage, title, content, author });
        await blog.save();
        res.status(200).json({ message: "Blog saved successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

getUserBlogs = async (req,res) => {

    const author = req.user_Id;

    try {
        const Blogs = await Blog.find({ author: author }).populate('author','userName');
        res.status(200).json({ Blogs });
    }

    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

deleteUserBlogs=async(req,res)=>{
    const blog_id=req.params.blog_id;

    try{
        await Blog.findOneAndDelete({_id:blog_id});
        await Comment.deleteMany({blog:blog_id});
        res.status(200).json({message:"Blog Deleted Successfully!"});
    }

    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }

}

editUserBlog=async(req,res)=>{

    const blog_id=req.params.blog_id;

    try{
        const {title,content,prevBlogImage}=req.body;
        let blogImage=req.file?req.file.filename:null;
        if(blogImage==null)
        {
            blogImage=prevBlogImage;
        }

        await Blog.findOneAndUpdate({_id:blog_id},{ blogImage:blogImage, title:title, content:content });
        res.status(200).json({message:'Blog edited successfully!'});
    }

    catch(error)
    {
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = { showBlog, addBlog, showOnlyBlog, getUserBlogs, deleteUserBlogs, editUserBlog}