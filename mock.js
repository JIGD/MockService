var util = require("util"),
    http = require("http"),
    url  = require("url"),
    fileSystem = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    events = require('events'),
    emitter = new events.EventEmitter(),
    responseDir = path.join(__dirname, 'response');


function writeFileToResponse(responseFile, response) {
  response.writeHead(200, {"Content-Type": "application/xml"});
  responseDir = path.join(responseDir, responseFile);
  file = fileSystem.createReadStream(responseDir);
util.pump(file, response);
console.log("Message sent!");
}


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
          if (responseFile !== null) {
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
server.listen(port);

util.puts("Server running at http://localhost:" + port);