//connect to database
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abc123",
    database: "nodejs"
});
conn.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});
conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("CREATE DATABASE NodeJS", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Harpreet Kaur', '3-381 Rue Lulli ,Laval')";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Record inserted");
    });
});

//select from database
conn.connect(function (err) {
    if (err) throw err;
    conn.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
        ['Amandeep', '3-381 Rue Lulli ,Laval'],
        ['davinder', '3-381 Rue Lulli ,Laval'],
        ['harman', 'Apple st 652'],
        ['Anmol', 'Mountain 21'],
    ];
    conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

//delete record
conn.connect(function (err) {
    if (err) throw err;
    var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
});

//drop table 
conn.connect(function (err) {
    if (err) throw err;
    var sql = "DROP TABLE user";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });
});

//update reord

conn.connect(function (err) {
    if (err) throw err;
    var sql = "UPDATE customers SET address = 'Montreal' WHERE name = 'harman'";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
}).listen(8080);

var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    fs.readFile('demofile1.html', function (err, data) {  //method is used to read files on your computer.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);

var fs = require('fs');

//create a file named mynewfile1.txt:
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    // method appends specified content to a file.If the file does not exist, the file will be created:
    if (err) throw err;
    console.log('Saved!');
});

var fs = require('fs');
//create an empty file named mynewfile2.txt:
fs.open('mynewfile2.txt', 'w', function (err, file) {
    //method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
    if (err) throw err;
    console.log('Saved!');
});

var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});
var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
    if (err) throw err;
    console.log('Updated!');
});
var fs = require('fs');

//create a file named mynewfile3.txt:
fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'hello ,how r u', function (err) {
    //method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created:
    if (err) throw err;
    console.log('Replaced!');
});


//delete file
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});


// rename file
var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
});