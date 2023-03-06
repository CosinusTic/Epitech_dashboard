const express = require("express");
const userModel = require("../models/index.js");
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());


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


module.exports = app;