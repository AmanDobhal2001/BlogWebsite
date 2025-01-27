const express=require('express');
const router=express.Router();
const  {showBlog,addBlog,showOnlyBlog}=require('../controllers/blogController');
const authHandler=require('../middlewares/authMiddleware');
const upload=require('../middlewares/fileUpload');


router.route('/').get(showBlog).post(authHandler,upload.single('blogImage'),addBlog);
router.route('/:blog_id').get(authHandler,showOnlyBlog);

module.exports=router;