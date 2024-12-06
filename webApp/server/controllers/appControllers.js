const User = require("../models/userSchema")
const bcrypt = require('bcryptjs');

const register = async (req,res) => {
    try {
        const { username, phonenumber, numberplate, deviceid, password } = req.body;
    
        if (!username || !phonenumber || !numberplate || !deviceid || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        const existingphonenumber = await User.findOne({ phonenumber });
        const existingdeviceid = await User.findOne({ deviceid });
        const existingnumberplate = await User.findOne({ numberplate });

        if (existingphonenumber) {
          return res.status(400).json({ message: "Phone number already in use" });
        }else if (existingnumberplate) {
          return res.status(400).json({ message: "Number plate already in use" });
        }else if (existingdeviceid) {  
          return res.status(400).json({ message: "Device ID already in use" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
          username,
          phonenumber,
          numberplate,
          deviceid,
          password: hashedPassword
        });
    
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error: error.message });
      }

    // console.log(req.body);
}

const login = async (req,res) => {
    const {numberplate, password} = req.query;
    const user = await User.findOne({numberplate});
    
    if(user){

      const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.status(200).json({message:"User logged in successfully"});
        }else{
            res.status(400).json({message:"Invalid password"});
        }
    }else{
        res.status(400).json({message:"Number Plate not found try Registering"});
    }
}

module.exports = {register,login}