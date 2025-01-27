const Comment = require('../models/Comment');

async function handleAddComment(req, res) {

    const comment = req.body.comment;
    const {blog_id} = req.params;
    const user = req.user_Id;

    try {
        const NewComment = new Comment({ comment:comment, blog:blog_id, user:user });
        await NewComment.save();

        res.status(200).json({ message: "Comment added successfully!" });
    }

    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

async function handleGetComment(req, res) {

    const {blog_id} = req.params;

    try {
        const comments = await Comment.find({ blog:blog_id }).populate('user', 'userName');
        res.status(200).json({ comments });
    }

    catch (error)
    {
        res.status(500).json({ error: "Internal server error" })
    }

}

module.exports = { handleAddComment, handleGetComment }