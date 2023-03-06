let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library
const mongoose = require('mongoose');
const Router = require('./routes');
let cors = require('cors');
let querystring = require('querystring');
let cookieParser = require('cookie-parser');
const userModel = require('./models/index.js');
const { send } = require('process');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
let client_id = 'bd7f0368f922474693e640130529eaff'; // Your client id
let client_secret = '9ce45f1573dc44feaf7c4c2323cda938'; // Your secret
let redirect_uri = 'http://localhost:5173/connectionSuccessful'


mongoose.connect('mongodb+srv://Nathan:123@cluster0.wy8itdq.mongodb.net/spotify_dashboard?retryWrites=true&w=majority', {
  useNewUrlParser: true
});
mongoose.set('strictQuery', false);
const db = mongoose.connection;


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

let app = express();

app.use(express.static(__dirname + '/public'))
  .use(express.urlencoded())
  .use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.get('/login', function (req, res) {
  let client_id = 'bd7f0368f922474693e640130529eaff'; // Your client id
  let client_secret = '9ce45f1573dc44feaf7c4c2323cda938'; // Your secret
  let redirect_uri = 'http://localhost:5173/connectionSuccessful' //redirect URI


  // your application requests authorization
  let scope = 'user-read-private user-read-email user-follow-read user-read-currently-playing';
  try {
    res.send('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri
      }));
  } catch (error) {
    console.log(error);
  }
});


app.post('/getToken/:code/:site_token', async (req, res) => {
  let code = req.params.code || null;
  let site_token = req.params.site_token || null;
  let client_id = 'bd7f0368f922474693e640130529eaff'; // Your client id
  let client_secret = '9ce45f1573dc44feaf7c4c2323cda938'; // Your secret
  let redirect_uri = 'http://localhost:5173/connectionSuccessful' //redirect URI


  let urlencoded = new URLSearchParams();
  urlencoded.append("code", code);
  urlencoded.append("redirect_uri", redirect_uri);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("client_id", client_id);
  urlencoded.append("client_secret", client_secret);

  let requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    body: urlencoded,
    redirect: 'follow'
  };

  const response = await fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  const existingUser = await userModel.findOne({ site_token: site_token }).exec()
  if (existingUser !== null) {
    const userToAdd = await userModel.findOneAndUpdate({ site_token: site_token }, { spotify_access_token: response.access_token, code: code }, { new: true })
    try {
      await userToAdd.save();
      res.json(response);
    }
    catch (error) {
      console.log(error);
    }
  }
  else {
    const user = await new userModel({ spotify_access_token: response.access_token, code: code, site_token: site_token })
    try {
      console.log(response);
      res.json(response)
      await user.save();

    }
    catch (error) {
      console.log(error);
    }
  }
})

app.get("/getFollowedArtists/:token", async (req, res) => {

  const site_token = req.params.token;
  const user = await userModel.findOne({ site_token: site_token });
  console.log("user found => ", user);

  let options = {
    headers: { 'Authorization': 'Bearer ' + user.spotify_access_token , 'Content-Type':  'application/json'},
    
    json: true
  };

  const response = await fetch('https://api.spotify.com/v1/me/following?type=artist', options)
    .then(response => response.json());

  try {
    await res.json(response);
  }
  catch (error) {
    console.log(error);
  }

})

app.get("/myProfile/:token", async(req, res) => {
  const site_token = req.params.token;
  const user = await userModel.findOne({site_token: site_token});
  console.log("user found => ", user);

  const options = {
    headers: {'Authorization' : ' Bearer ' + user.spotify_access_token, 'Content-Type': 'application/json'}, 
    json: true
  }

  const response = await fetch('https://api.spotify.com/v1/me', options)
    .then(response => response.json())

  try{
    res.json(response);
  }
  catch(error){
    console.log(error);
  }
})

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3004, () => {
  console.log("Listening on port 3004");
});