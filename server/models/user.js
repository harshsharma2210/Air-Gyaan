const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    platformId: String,
    name: String,
    pic: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;


