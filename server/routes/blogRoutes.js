const express=require('express');
const router=express.Router();
const  {showBlog,addBlog,showOnlyBlog, getUserBlogs, deleteUserBlogs, editUserBlog}=require('../controllers/blogController');
const authHandler=require('../middlewares/authMiddleware');
const upload=require('../middlewares/fileUpload');


router.route('/').get(showBlog).post(authHandler,upload.single('blogImage'),addBlog);

router.route('/MyBlogs').get(authHandler,getUserBlogs);
router.route('/MyBlogs/:blog_id').delete(authHandler,deleteUserBlogs).patch(authHandler,upload.single('blogImage'),editUserBlog);

router.route('/:blog_id').get(authHandler,showOnlyBlog);

module.exports=router;