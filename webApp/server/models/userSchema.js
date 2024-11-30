const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    numberPlate: {
        type: String,
        required: true,
        unique: true
    },
    deviceId: {
        type: Number,
        required: true,
        unique: true
    },
});

const users = mongoose.model('users', userSchema);
module.exports = users;
