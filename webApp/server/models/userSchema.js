const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    numberplate: {
        type: String,
        required: true,
        unique: true
    },
    deviceid: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const users = mongoose.model('users', userSchema);
module.exports = users;
