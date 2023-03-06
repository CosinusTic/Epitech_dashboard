const express = require('express');
const Router = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(Router);

app.listen(3001, () => {
  console.log("Listening on port 3001");
}); 