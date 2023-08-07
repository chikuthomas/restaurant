const express= require('express');
const app =express();
const cors= require('cors');
const morgan= require('morgan');
//importing the database connection 
const connectDB =require('./databases/db');
const authRoutes = require('./routes/auth');


//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json ());
app.use('/api/auth',authRoutes);


//calling this function to connect to the database
connectDB();


// creating a variable for port creation

const port = process.env.PORT || 5000;

//if port is open the connect
app.listen(port,()=> console.log(`Listening on Port ${port}`));