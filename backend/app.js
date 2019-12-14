const express = require('express');
var OAuth = require('oauth');
const bodyParser = require("body-parser");


const app = express();
app.use(express.json());

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

var header = { "X-Yahoo-App-Id": "Hc2Mom6g" };
var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9UEM2VjlQOUgyalgyJmQ9WVdrOVNHTXlUVzl0Tm1jbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTVm',
    'd95a99e959ed2157f347fda3a1183e463abcea6f',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);

app.get('/api', function (req, res, next) {
    // console.log(req.query);
    city = req.query.city;
    request.get(
        'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + city + '&format=json',
        null,
        null,
        function (err, data, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        }
    );

});

const PORT = 3100;

const server = app.listen(
    PORT,
    console.log(
        `Server running in on port ${PORT}`
    )
);