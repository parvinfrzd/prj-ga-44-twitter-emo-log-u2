const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    facts: [factSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('UserLogin', userSchema);