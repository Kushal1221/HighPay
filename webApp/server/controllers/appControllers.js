const User = require("../models/userSchema")

const register = async (req,res) => {
    const {username,phoneNumber,numberPlate,deviceId} = req.body;
    const newUser = new User({
        username,
        phoneNumber,
        numberPlate,
        deviceId
    })
    await newUser.save();
    res.status(200).json({message:"User registered successfully"});
}

const login = async (req,res) => {

}

module.exports = {register,login}