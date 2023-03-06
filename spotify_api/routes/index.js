const express = require("express");
const userModel = require("../models/index.js");
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(express.urlencoded());
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


app.post("/addUser/", async (req, res) => {
    const existingUser = await userModel.findOne({access_token: req.body.access_token}).exec()

    if(existingUser)
    {
        console.log("user already exists =>", existingUser);
        res.send(existingUser);
    }
    else
    {
        const user = new userModel({
            code: req.body.code,
            access_token: req.body.access_token
        });
    
        try{
            user.save();
            res.send(user);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
})

app.get("/users", async(req, res) => {
    const user = await userModel.find({});
    try{
        res.send(user);
    }
    catch(error){
        console.log(error);
    }
})

app.get('/users/:usertoken', async(req, res) => {
    const user = await userModel.findOne({access_token: req.params.token})

    try{
        res.send(user);
    }
    catch(error){
        console.log(error);
    }
})

// app.get('', async(req, res) => {
//     `https://api.spotify.com/v1/search?q=${artist}&type=album
// })


module.exports = app;