const express=require('express');
const router=express.Router();
const  {showBlog,addBlog}=require('../controllers/blogController');
const authHandler=require('../middlewares/authMiddleware');


router.route('/').get(showBlog);
router.route('/').post(authHandler,addBlog);

module.exports=router;