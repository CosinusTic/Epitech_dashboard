const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    code: {
        type: String
    },
    site_token: {
        type: String
    }, 
    spotify_access_token: {
        type: String
    }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;