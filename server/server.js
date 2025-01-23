require('dotenv').config();
const express=require('express');
const {ConnectDb}=require('./config/db');
const PORT=process.env.PORT;
const app=express();

//Connection to databse
ConnectDb();

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})