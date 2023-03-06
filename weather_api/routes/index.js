const express = require('express');
const { response } = require('../../private_api/routes');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.use(express.urlencoded());
app.get("/forecasts/:countryCode/:cityName", async (req, res) => {
    const urlencoded = new URLSearchParams();
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    let cityName;
    let forecasts;
    console.log(req.params.countryCode);
    console.log(req.params.cityName);

    await fetch("http://dataservice.accuweather.com/locations/v1/cities/" + req.params.countryCode + "/search?apikey=UcqwHD18iV8A9VJUGHeY5fCgT78JVhLG&q=" + req.params.cityName, requestOptions)
        .then(response => response.json())
        .then(response => cityName = response)
        // .then(result => forecasts = result)
        .catch(error => console.log('error', error));

    await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + cityName[0].Key + "?apikey=UcqwHD18iV8A9VJUGHeY5fCgT78JVhLG", requestOptions)
        .then(response => response.json())
        .then(result => forecasts = result)
        .catch(error => console.log('error', error));


    try {
        res.send(forecasts);
    }
    catch (error) {
        console.log(error);
    }

    // locatio example: '27581'


});

//get current conditions of a location name
app.get("/currentCondition/:countryCode/:cityName", async (req, res) => {
    //example request from API: http://dataservice.accuweather.com/currentconditions/v1/27581?apikey=Uka3EYKelW1gFYsXflGqLOBSvJQSvGz9
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let cityName;
    let conditions;

    await fetch("http://dataservice.accuweather.com/locations/v1/cities/" + req.params.countryCode + "/search?apikey=Uka3EYKelW1gFYsXflGqLOBSvJQSvGz9&q=" + req.params.cityName, requestOptions)
        .then(response => response.json())
        .then(response => cityName = response)
        .then((response) => console.log(response[0].Key))
        .catch(error => console.log('error', error));

    await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityName[0].Key + "?apikey=Uka3EYKelW1gFYsXflGqLOBSvJQSvGz9", requestOptions)
        .then(response => response.json())
        .then(result => conditions = result)
        .catch(error => console.log('error', error));

    try {
        res.send(conditions);
    }
    catch (error) {
        console.log(error);
    }

    //final request: http://localhost:3001/currentCondition/BE/brussels
})


//get all cities that match input
app.get("/getCities/:cityName", async (req, res) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let cityName;

    await fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Uka3EYKelW1gFYsXflGqLOBSvJQSvGz9&q=' + req.params.cityName)
        .then((response) => response.json())
        .then((response) => cityName = response)
        .then((response) => console.log(response))

    try {
        res.send(cityName)
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = app;

