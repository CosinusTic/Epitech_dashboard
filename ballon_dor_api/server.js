const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');
var bodyParser = require('body-parser');

const app = express();
app.use(Router);
app.use(express.json());
app.use(express.urlencoded())
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://Nathan:123@cluster0.wy8itdq.mongodb.net/ballonDor_dashboard?retryWrites=true&w=majority", {
    useNewUrlParser: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.listen(3005, () => {
    console.log("Listening on post 3005")
});
