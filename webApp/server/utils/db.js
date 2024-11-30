const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;

const connectDb = async() => {
    try{
        await mongoose.connect(mongoURI);
        console.log("Database connected");
    }catch(err){
        console.log("Error connecting to database", err);
        process.exit(0);
    }
}

module.exports = connectDb;