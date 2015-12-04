var express = require('express');
var http = require('http');
mongoose = require('mongoose');
var requireDir = require('require-dir');
var bodyParser = require('body-parser');

app = express();

app.use(express.static('../static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost/saveme');


models = require('./models.js');
services = requireDir('./services/');


var server = app.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;
});

app.get('/healthPlaces', function(req, res){
    res.send('ok');
});

console.log('Sever started on ' + server.address().port + ' port !');
