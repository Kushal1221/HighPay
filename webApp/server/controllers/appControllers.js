const User = require("../models/userSchema")

const register = async (req,res) => {
    try {
        const {username,phoneNumber,numberPlate,deviceId,password} = req.body;
        const newUser = new User({
            username,
            phoneNumber,
            numberPlate,
            deviceId,
            password
        })
        await newUser.save();
        res.status(200).json({message:"User registered successfully"});
    } catch (error) {
        res.status(400).json({message:"Same phone number, number plate or device id already exists"}); 
    }
}

const login = async (req,res) => {
    const {numberPlate, password} = req.body;
    const user = await User.findOne({numberPlate});
    if(user){
        if(user.password === password){
            res.status(200).json({message:"User logged in successfully"});
        }else{
            res.status(400).json({message:"Invalid password"});
        }
    }else{
        res.status(400).json({message:"User not found try Registering"});
    }
}

module.exports = {register,login}