var findResponseFor = function(body, responseMap) {
  var result = {file: "searchRS.xml"};
  responseMap.forEach(function(candidate) {
    if (body.match(candidate.pattern)) {
      result = candidate.response;
      return;
    } 
  })
  return result;
}

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
exports.findResponseFor = req;