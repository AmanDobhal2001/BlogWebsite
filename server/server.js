require('dotenv').config();
const express=require('express');
const PORT=process.env.PORT;
const app=express();
const authRoutes=require('./routes/authRoutes');
const {ConnectDb}=require('./config/db');
const blogRoutes=require('./routes/blogRoutes');
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
const path = require('path');
const commentRoutes=require('./routes/commentRoutes');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Connect to database
ConnectDb();

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/blog',blogRoutes);
app.use('/api/comment',commentRoutes);

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`);
})