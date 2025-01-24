const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({

    userName:{type:String,required:true},

    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},

    profileImage:{type:String,default:'../Images/img.jpg'}

},{timestamps:true})


userSchema.pre('save',async function(next){

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.comparePassword=async function(password){

    return await bcrypt.compare(password,this.password);

}

const User=mongoose.model('user',userSchema);

module.exports=User;