const express=require('express');
const router=express.Router();
const {signUp,logIn}=require('../controllers/authController');
const {body}=require('express-validator');
const upload=require('../middlewares/fileUpload');

router.route('/signup').post(upload.single('profileImage'),
[
    body('userName',"Name must be 4 characters long").isLength({min:4}),
    body('email',"Email is invalid").isEmail(),
    body('password',"Password must be 4 characters long").isLength({min:4}),
],signUp);

router.route('/login').post([
    body('email',"Email is invalid").isEmail(),
    body('password',"Password must be 4 characters long").isLength({min:4})],logIn);

module.exports=router;