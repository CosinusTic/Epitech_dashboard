const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());  

app.use(express.static(__dirname + '/public'))
  .use(express.urlencoded())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
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