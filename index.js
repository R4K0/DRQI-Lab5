//Import express
const express = require(`express`)
//Create an instance of an express app
const app = express()

//path, so we can join path to our index.html easily so it can be correctly resolved
const path = require(`path`)
//bodyparser middleware, so any incoming requests extracts and PARSES the body so it's available as req.body
const bodyParser = require(`body-parser`) 

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//Create a GET endpoint of our API
app.get(`/api/movies`, (req, res) => {
    // We use the res object to create a respone, we append a json body to it, then, we append a HTTP status 200 (everything is all right!) response, and then we finally send it off!
    res.status(200).json({
        "movies": [
            {
                "Title": "Avengers: Infinity War",
                "Year": "2018",
                "imdbID": "tt4154756",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
            },
            {
                "Title": "Captain America: Civil War",
                "Year": "2016",
                "imdbID": "tt3498820",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
            }
        ]
    })
})

app.get(`/hello/:name`, (req, res) => {
    // An example of route with parameters, parameters are stored on the Request object within .params
    res.status(200).send(req.params.name);
})

// Just a handy method to send us from INDEX to /test
app.get(`/`, (req, res) => {
    res.redirect(`/test`);
})

// Serve our webpage on /test
app.get(`/test`, (req, res) => {
    res.sendFile(path.join(__dirname+`/index.html`));
})

// GET methods show their query parameters in the URL, POST methods encode it in the body
app.get(`/name`, (req, res) => {
    res.send(`Hello, ${req.query.firstname + " " + req.query.surname}`)
})

app.post('/name', (req, res) => {
    res.send(`Hello, ${req.body.firstname + " " + req.body.surname}`)
})

//Make our express app listen on the port 3000
app.listen(3000, () => {
    console.log(`Listening on port 3000`);
})