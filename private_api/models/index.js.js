const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
    type: String, 
    required: true
    },
    access_token: {
    type: String,
    default: null
    },
    password: {
    type: String,
    required: false, 
    default: 123
    },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;