var mysql = require('mysql');
var http = require('http');
var url = require('url');
var fs = require('fs');


var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abc123",
    database: "nodejs"
});
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log(filename);
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 not found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8083);

var express = require("express");
var app = express();
var path = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/HostelReservations', function (req, res) {
    res.sendFile(path.join(__dirname + '/HostelReservations.html'));
    var UserId = req.params.id;
    var sql = `SELECT * FROM hostelreservations WHERE id=${UserId}`;
    db.query(sql, function (err, data) {
        if (err) throw err;

        res.render('users-form', { title: 'User List', editData: data[0] });
    });
});
app.post('/HostelReservations', function (req, res) {

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var gender = req.body.gender;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var email = req.body.email;

    res.write('You sent the firtsname "' + req.body.firstname + '".\n');
    res.write('You sent the lastname "' + req.body.lastname + '".\n');
    res.write('You sent the gender "' + req.body.gender + '".\n');
    res.write('You sent the startdate "' + req.body.startdate + '".\n');
    res.write('You sent the enddate "' + req.body.enddate + '".\n');
    res.write('You sent the email "' + req.body.email + '".\n');

    conn.connect(function (err) {
        if (err) throw err;
        // var sql = "INSERT INTO hostelreservations (firstname,lastname, gender,startdate,enddate,email) VALUES ('" + firstname + "', '" + lastname + "','" + gender + "', '" + startdate + "', '" + enddate + "','" + email + "')";
        var sql = "INSERT INTO hostelreservations (firstname, lastname, gender, startdate, enddate, email) values ('" + req.body.firstname + "' , '" + req.body.lastname + "', '" + req.body.gender + "','" + req.body.startdate + "','" + req.body.enddate + "','" + req.body.email + "');";
        conn.query(sql, function (err, result) {
            if (err) {
                throw err;
            } console.log("Number of records inserted: " + result.affectedRows);
        });

    });
    var msg = "Reservation Successfully done'" + req.body.firstname;
    alert(msg);
});

app.listen(8080);
console.log("Running at Port 8080");