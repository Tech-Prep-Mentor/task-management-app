const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    displayName: { type: String, required: true },
    // Other user details can go here (e.g., email, passwordHash, etc.)
});

const User = mongoose.model('User', userSchema);

module.exports = User;