const JWT=require('jsonwebtoken');

async function authHandler(req,res,next)
{
    const token=req.headers.authorization?.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({error:"Invalid token"})
    }

    try{
    const data=await JWT.verify(token,process.env.SECRET_KEY);
    req.user_Id=data.user_Id;
    next();
    }

    catch(error)
    {
        console.log(error)
        res.status(401).json({error:"Internal server error"});
    }
}

module.exports=authHandler