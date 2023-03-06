const express = require('express');
const Router = require('./routes');
let cookieParser = require('cookie-parser');
let cors = require('cors')

const app = express();

app.use(express.json());
app.use(Router);
app.use(cors());  

app.use(express.static(__dirname + '/public'))
  .use(express.urlencoded())
  .use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
}); 