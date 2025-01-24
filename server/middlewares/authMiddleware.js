const JWT=require('jsonwebtoken');

async function authHandler(req,res,next)
{
    const token=req.headers.authorization?.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({error:"Invalid token"})
    }

    try{
    const data=await JWT.verify(token,process.env.JWT_SECRET);

    req.user_id=data.user_id;
    next();
    }

    catch(error)
    {
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports=authHandler