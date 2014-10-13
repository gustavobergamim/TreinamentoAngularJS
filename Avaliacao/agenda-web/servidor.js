var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/publico'));

app.listen(8880);