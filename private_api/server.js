const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');
var bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded())
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://Nathan:123@cluster0.wy8itdq.mongodb.net/private_dashboard?retryWrites=true&w=majority", {
    useNewUrlParser: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});