var express = require('express'),
bodyParser = require('body-parser'),
webhook = require('./routes/webhook.js'),
cors = require('cors');

var app = express();

app.use(express.logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 

app.post('/webhook', webhook.process_request);

var server = require('http').createServer(app);
console.log('Listening on port 3000...');
server.listen(process.env.PORT || 3000);
