

var express = require('express'),
    ejs = require('ejs'),
    fs = require('fs'),
    mysql = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' //<your password
});

// var app = module.exports = express.createServer();
var app = express();
// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS nodejs', function (err) {
    if (err) throw err;
    connection.query('USE nodejs', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(30)'
            + ')', function (err) {
                if (err) throw err;
            });
    });
});

// Configuration

app.use(express.bodyParser());
app.set("view options", { layout: false });
// Main route sends our HTML file

app.get('/adduser', function (req, res) {
    res.sendfile('/newuser.html', { root: __dirname });
});



app.get('/', function (req, res) {
    connection.query('select * from users',
        function (err, result, fields) {
            if (err) throw err;
            else {
                console.log(result);
                res.render(__dirname + '/User.html', { names: result });

            }
        });

});


app.post('/deleteuser', function (req, res) {
    var id = Number(req.query.id);
    console.log(id);
    connection.query('delete from users where id=' + id,
        function (err, result, fields) {
            if (err) throw err;
            else res.redirect('/');
        });

});



app.post('/users', function (req, res) {
    connection.query('INSERT INTO users SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

// Update MySQL database

app.post('/edituser', function (req, res) {
    console.log(req.body.name);
    connection.query("UPDATE users SET name='" + req.body.name + "' where id='" + req.body.id + "'", function (err, result) {
        if (err) throw err;
        res.send('User updated in database with ID: ' + req.body.id);
    }
    );
});



// Begin listening

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);