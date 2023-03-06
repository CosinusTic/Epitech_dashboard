const mongoose = require("mongoose");

const BallonDorSchema = new mongoose.Schema({
    year: {
        type: String, 
    },
    player: {
        type: String, 
    }, 
    nationality: {
        type: String, 
    }, 
    club : {
        type: String, 
    }

});
const BallonDor = mongoose.model("BallonDor", BallonDorSchema);
module.exports = BallonDor;