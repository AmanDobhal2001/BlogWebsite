const mongoose=require('mongoose');

async function ConnectDb()
{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    }

    catch(error)
    {
        console.log("Database connection failed",error);
    }
}

module.exports={ConnectDb};