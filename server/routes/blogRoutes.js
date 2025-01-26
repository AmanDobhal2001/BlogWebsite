const express=require('express');
const router=express.Router();
const  {showBlog,addBlog,showOnlyBlog}=require('../controllers/blogController');
const authHandler=require('../middlewares/authMiddleware');
const upload=require('../middlewares/fileUpload');


router.route('/').get(showBlog);
router.route('/:blog_id').get(authHandler,showOnlyBlog);
router.route('/').post(authHandler,upload.single('blogImage'),addBlog);

module.exports=router;