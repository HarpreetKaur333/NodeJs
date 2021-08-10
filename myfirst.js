var http = require('http');
var uc = require('upper-case');
var url = require('url');
var dt = require('./date'); //include date module

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' }); //Add an HTTP Header
    res.write(req.url);
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write(uc.upperCase("Hello World!"));
    res.end('Hello World!');
}).listen(7070);

