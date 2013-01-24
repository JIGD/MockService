var util = require("util"),  
    http = require("http");

var findResponseFor = function(body, responseMap) {
  var result = {file: "searchRS.xml"};
  responseMap.forEach(function(candidate) {
    if (body.match(candidate.pattern)) {
      result = candidate.response;
      return;
    } 
  });
  return result;
};

function writeWebserviceToResponse(request, response) {
  var params = url.parse(request.url);
  var options = {
    host: 'your.webservice.com',
    path: params.path,
    headers: {'Authorization' : request.headers.authorization}
  };


  var req = http.get(options, function(res) {
    res.setEncoding('utf8');
    response.writeHead(res.statusCode, res.headers);
    res.on('data', function (chunk) {
      response.write(chunk);
    });  
    res.on('end', function() {
      response.end();
    });
  });

  req.on('error', function(     e) {
    console.log('problem with request: ' + e.message);
  });
}

exports.findResponseFor = findResponseFor;
exports.writeWebserviceToResponse= writeWebserviceToResponse;
