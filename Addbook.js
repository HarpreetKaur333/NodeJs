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


conn.query('CREATE DATABASE IF NOT EXISTS nodejs', function (err) {
    if (err) throw err;
    conn.query('USE nodejs', function (err) {
        if (err) throw err;
        conn.query('CREATE TABLE IF NOT EXISTS booklibrary('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'bookname VARCHAR(500),'
            + 'author VARCHAR(100),'
            + 'date date,'
            + 'category  VARCHAR(100)'
            + ')', function (err) {
                if (err) throw err;
            });
    });
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
}).listen(7070);


var express = require("express");
var app = express();
var path = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/BookLib.html'));
});
app.get('/addbook', function (req, res) {
    res.sendFile(path.join(__dirname + '/addbook.html'));
});

app.get('/searchbook', function (req, res) {
    res.sendFile(path.join(__dirname + '/searchbook.html'));
});
app.get('/editBook/:id', function (req, res, next) {
    var Id = req.params.id;
    var sql = `SELECT * FROM booklibrary WHERE id=${Id}`;
    conn.query(sql, function (err, data) {
        if (err) throw err;

        res.render('users-form', { title: 'book list', editData: data[0] });
    });
});
app.post('/editBook/:id', function (req, res, next) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE booklibrary SET ? WHERE id= ?`;
    conn.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.writeHead(302, {
        'Location': 'http://localhost:8080/'
    });
    res.end();
});

app.post('/savebook', function (req, res) {
    var formData = req.body;

    var sql = "INSERT INTO booklibrary (bookname, author, date, category) values ('" + formData.bookname + "' , '" + formData.author + "', '" + formData.pdate + "','" + formData.category + "');";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

    res.writeHead(302, {
        'Location': 'http://localhost:8080/'
    });
    res.end();
});

app.post('/searchbook', function (req, res) {
    var serachdata = req.body;

    var bookname = (serachdata.bookname) ? serachdata.bookname : "";
    var author = (serachdata.author) ? serachdata.author : "";
    var category = (serachdata.category) ? serachdata.category : "";
    var sql = "select * from booklibrary where bookname like ? OR author like ? OR category like ?";
    var array = ['%' + bookname + '%', '%' + author + '%', '%' + category + '%']

    // var sql = "select * from booklibrary where  bookname like '%" + bookname + "%' ";
    // var sql = 'SELECT * FROM booklibrary  WHERE bookname = ? OR author = ? OR category=? ';
    conn.query(sql, array, function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        return res.end(JSON.stringify(result));
    });
});
app.post('/deleteBook', function (req, res) {
    var deleterecord = req.body;
    var sql = "delete from booklibrary where id=" + deleterecord.id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        return res.end();
    });
    res.writeHead(302, {  //redirect old page
        'Location': 'http://localhost:8080/'
    });
    res.end();
});

app.listen(8080);
console.log("Running at Port 8080");



