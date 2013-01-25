var util = require("util"),
  http = require("http"),
  url = require("url"),
  fileSystem = require('fs'),
  path = require('path'),
  utils = require('./utils'),
  events = require('events'),
  emitter = new events.EventEmitter(),
  responseDir = path.join(__dirname, 'response');


function writeFileToResponse(responseFile, response) {
  response.writeHead(200, {
    "Content-Type": "application/" + extension
  });
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
      if(responseFile !== null) {
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

var port;
var extension;
var input1 = process.argv[2];
var input2 = process.argv[3];

console.log(typeof(input1) + " " + typeof(input2));
if(!isNaN(input1)) {
  port = input1;
} else {
  if(typeof(input1) === "string") {
    extension = input1;
  }
}
if(!isNaN(input2)) {
  port = input2;
} else {
  if(typeof(input2) === "string") {
    extension = input2;
  }
}
port = port || 1337;
extension = extension || "xml";
server.listen(port);

util.puts("Server running at http://localhost:" + port + " using " + extension);