var express = require('express');
var httpProxy = require('http-proxy');

var apiForwardingUrl = 'http://api.open-notify.org/astros.json?';

var server = express();
server.set('port', 3000);
server.use(express.static(__dirname + '/app'));

var apiProxy = httpProxy.createProxyServer();

console.log('Forwarding API requests to ' + apiForwardingUrl);

server.all("/space/*", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});
