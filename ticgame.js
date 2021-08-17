const express = require('express');
const app = express();
const port = 8080;
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded());

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ticgame.html');
});

// Process form submit
app.post('/submit', (req, res) => {
    console.log(req.body.user.name);
    console.log(req.body.user.email);
});
app.listen(8080);
console.log("Running at Port 8080");