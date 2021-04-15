
// Setup empty JS object to act as endpoint for all routes
 projectData = {};

// Require Express to run server and routes

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8888;
app.listen(port,() => {console.log(`server is runnig and listening to port ${port}`);});



app.get('/allData', (req, res) => {
  res.send(projectData);
})

app.post('/addData',  (req, res) => {
projectData.temp = req.body.temp;
projectData.date = req.body.date;
projectData.content = req.body.content;
res.send(projectData);
console.log(projectData);
})