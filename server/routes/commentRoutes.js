const express=require('express');
const router=express.Router();
const authHandler=require('../middlewares/authMiddleware');
const {handleAddComment,handleGetComment}=require('../controllers/commentController')

router.route('/:blog_id').post(authHandler,handleAddComment).get(authHandler,handleGetComment);

module.exports=router;