require('dotenv').config();
const express=require('express');
const PORT=process.env.PORT || 8080;
const app=express();
const authRoutes=require('./routes/authRoutes');
const {ConnectDb}=require('./config/db');
const blogRoutes=require('./routes/blogRoutes');
const cors = require('cors');
app.use(cors({ origin: 'https://amandobhal2001.github.io/BlogWebsite/' }));
const path = require('path');
const commentRoutes=require('./routes/commentRoutes');
const status=require('express-status-monitor');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(status());

//Connect to database
ConnectDb();

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/blog',blogRoutes);
app.use('/api/comment',commentRoutes);

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`);
})