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

addBlog = async (req, res) => {

    try {
        const user_id = req.user_id;
        const { blogImage,title, content } = req.body;

        const blog = new Blog({blogImage, title, content, user_id });
        await blog.save();
        res.status(200).json({ message: "Blog saved successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = { showBlog, addBlog }