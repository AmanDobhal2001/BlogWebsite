const Blog = require('../models/Blog');

showBlog = async (req, res) => {
    try {
        
        const blog=await Blog.find().populate('author','userName');

        res.status(200).json({blog});
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}


showOnlyBlog = async (req, res) => {
    try {
        const id=req.params.blog_id;
        
        const blog=await Blog.findOne({_id:id}).populate('author','userName');
        res.status(200).json({blog});
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

        const blogImage=req.file?req.file.filename:undefined;

        const blog = new Blog({blogImage, title, content, author });
        await blog.save();
        res.status(200).json({ message: "Blog saved successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = { showBlog, addBlog , showOnlyBlog }