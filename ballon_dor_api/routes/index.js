const express = require("express");
const ballonModel = require("../models/index.js");
const app = express();
var bodyParser = require('body-parser');
const { createHash } = require('crypto');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());


app.get("/all", async (req, res) => {
    const response = await ballonModel.find({}).exec();

    try {
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});

app.get('/all/findWithYear/:year', async(req, res) => {
    const response = await ballonModel.find({year: req.params.year})

    try{
        res.json(response);
    }
    catch(error){
        console.log(error);
    }
});

app.get('/all/findWithName/:name', async(req, res) => {
    const response = await ballonModel.find({player: req.params.name})

    try{
        res.json(response);
    }
    catch(error){
        console.log(response);
    }
});

app.get('/all/findWithClub/:club', async (req, res) => {
    const response = await ballonModel.find({club: req.params.club})

    try{
        res.json(response);
    }
    catch(error){
        console.log(response);
    }
});

app.get('/all/findWithNationality/:nationality', async(req, res) => {
    const response = await ballonModel.find({nationality: req.params.nationality});

    try{
        res.json(response);
    }
    catch(error){
        console.log(error);
    }
});

app.post("/addData", async (req, res) => {

    const toAdd = new ballonModel({
        year: req.body.year, 
        player: req.body.player, 
        nationality: req.body.nationality,
        club: req.body.club
    });

    console.log("toAdd created =>", toAdd)

    try {
        await toAdd.save();
        res.send(toAdd);
    }
    catch (error) {
        res.send(error);
        console.log(error);
    }
}
);

module.exports = app;