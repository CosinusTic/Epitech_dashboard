const { urlencoded } = require('express');
const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(urlencoded());

//get exchange rate between two currency arguments
app.get("/conversionRate/:from/:to", async (req, res) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let conversionRate;
    await fetch("https://www.amdoren.com/api/currency.php?api_key=xXDQLuTqMRwJvQynCVKBzdAkpqNfyC&from=" + req.params.from +  "&to=" + req.params.to)
        .then(response => response.json())
        .then(response => conversionRate = response)
        .then(response => console.log(response))

    try{
        res.send(conversionRate);
    }
    catch(error){
        console.log(error);
    }

    //example request: http://localhost:3002/conversionRate/EUR/USD
});

//convert certain amount of money from one currency to another
app.get("/convertAmount/:from/:to/:amount", async (req, res) => {
    const requestOptions = {
        method: "GET", 
        redirect: "follow"
    };
    
    let convertedAmount;

    await fetch("https://www.amdoren.com/api/currency.php?api_key=xXDQLuTqMRwJvQynCVKBzdAkpqNfyC&from=" + req.params.from + "&to=" + req.params.to + "&amount=" + req.params.amount)
        .then(response => response.json())
        .then(response => convertedAmount = response)
        .then(response => console.log(response));
    
    try{
        res.send(convertedAmount);
    }
    catch(error){
        console.log(error);
    }

    //example request: http://localhost:3002/convertAmount/EUR/USD/50
})

module.exports = app;