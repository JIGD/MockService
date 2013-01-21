/*
Uses latest & greatest NodeJS version (0.7.5), may cause external libraries
like Mu to not work because of a changed package (sys was renamed to util)
Fix manually by going into ./node_modules/mu and replacing all instances of
require('sys') with require('util'). Should just run under earlier versions
of Node as long as you replace the below require('util') with require('sys').

Download dependencies using 'npm install'

Run using node mock.js <port (optional)>

*/

var util = require("util"),  
    http = require("http"),
    url  = require("url"),
    fileSystem = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    responseDir = path.join(__dirname, 'response');


function writeFileToResponse(responseFile, response) {
  response.writeHead(200, {"Content-Type": "application/xml"});
  server.on('data', function(chunk) {
      response.write(chunk)
    })
    .addListener('end', function() {
      response.end()
    });
}



function writeWebserviceToResponse(request, response) {
  var params = url.parse(request.url);
  var options = {
    host: 'your.webservice.com',
    path: params.path,
    headers: {'Authorization' : request.headers.authorization}
  };

var server = http.createServer(function(request, response) {  
  var params = url.parse(request.url);
  var body = "";
  console.log("request params: " + util.inspect(params));

    function addListeners() {
        request.on("data", function(data) {
            console.log("data (tick: )");
            body += data.toString();
        });
        request.on("end", function() {

          var responseFile = utils.findResponseFor(body, require('./responses').getResponses());
          if (responseFile != null) {
            console.log("Response found: " + util.inspect(responseFile));
            writeFileToResponse(responseFile, response);
          } else {
            console.log("Response not found");
          }


        });

        console.log("handlers registered");
    }

 addListeners();


});

var port = process.argv[2] || 1337;
server.listen(port)

util.puts("Server running at http://localhost:" + port);