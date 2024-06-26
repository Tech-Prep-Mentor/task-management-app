const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        unique: true,
        required: true
    },
    password: {
        type: "String",
        requred: true
    },
    profilePic: {
        type: "String",
        default: 'https://www.gravatar.com/avatar/?d=identicon'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;