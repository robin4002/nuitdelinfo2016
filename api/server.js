var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
app = express();
var requireDir = require('require-dir');


var services = requireDir('./services/');


var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
});

app.get('/healthPlaces', function(req, res){
    res.send('ok');
});

console.log('Sever started on ' + server.address().port + ' port !');
