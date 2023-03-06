const express = require("express");
const userModel = require("../models/index.js");
const app = express();
var bodyParser = require('body-parser');
const { createHash } = require('crypto');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors())


/* Read */
app.get("/users", async (request, response) => {
  const users = await userModel.find({});
  console.log(users)
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users/:id", async (request, response) => {
  const user = await userModel.findById(request.params.id);
  console.log(user)
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/usersWithToken/:token", async(req, res) => {
  const access_token = req.params.token;
  const user = await userModel.findOne({access_token: access_token});
  console.log(user);

  try{
    res.json(user);
  }
  catch(error)
  {
    console.log(error);
  }
})



app.post("/connection", async (req, res) => {
  console.log("request body email: ", req.body.email);
  let date = new Date()
  let currentDate = date.getDay().toString()
  let access_token = createHash('sha256').update(currentDate).digest('hex');
  const existingUser = await userModel.findOne({email: req.body.email}).exec()

  if(existingUser)
  {
    console.log("User already exists => ", existingUser);
    res.send(existingUser);
  }
  else
  { 
    const user = new userModel({
      email: req.body.email,
      access_token: access_token
    });

    console.log("user created =>", user)
    
    try{
      await user.save();
      res.send(user);
    }
    catch(error)
    {
      res.send(error);
      console.log(error);
    }
  }
});

app.post("/login", async(req, res) => {
  const user = await userModel.find({email: req.body.email})
  console.log(user);

  try{
    res.send(user);
  }
  catch(error){
    res.status(500).send(error);
  }
})

app.put("/users/:id", async (request, response) => {
  console.log("request body: ", request.body);
  
  try {
    console.log(request.params.id)
    const user = await userModel.findById(request.params.id)
    user.email = request.body.email
    user.password = request.body.password
    await user.save()
      console.log(user)
      response.status(200).send(user)
    } catch (err) {
      console.log(err)
    }
});


app.delete("/users/:id", async(request, response) => {
  try{
    console.log(request.params.id);
    const user = await userModel.findByIdAndDelete(request.params.id);
    response.send(user);
  }
  catch(error){
    console.log(error);
  }
});

module.exports = app;