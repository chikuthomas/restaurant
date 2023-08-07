//importing mongoose
const mongoose=require('mongoose');

//creating a connection to mongo database
const connectDB = async() =>{

    try {
        await mongoose.connect('mongodb+srv://restaurant-user:Dev1010!@restaurant.3akxzgg.mongodb.net/?retryWrites=true&w=majority',{
       
        useNewUrlParser: true,
        useUnifiedTopology: true
    
    });

    //Output if connection to the database is successful
    console.log('Database Connected Successfully')
    } catch (error) {

        //output if database connection error
        console.log(error)
        
    }
};

//exporting the connection to be used in other files
module.exports = connectDB;