const express = require('express')
var urlContainer = require('./container')
const app = express()

app.get('/', function (req, res) {
  res.writeHead(200,{'Content-Type' : 'text/plain'})
  res.end('\
URL Shortener Microserver API Project\n\
\n\
User stories:\n\
    I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.\n\
    If I pass an invalid URL that doesn\'t follow the valid http://www.example.com format, the JSON response will contain an error instead.\n\
    \n\
Example creation usage:\n\
    https://url-shortener-microserver-shihung.c9users.io/new/https://www.google.com\n\
    https://url-shortener-microserver-shihung.c9users.io/new/http://foo.com:80\n\
    \n\
Example creation output:\n\
    { "original_url":"http://foo.com:80", "short_url":"https://url-shortener-microserver-shihung.c9users.io//8170" }\n\
    \n\
Usage:\n\
    https://url-shortener-microserver-shihung.c9users.io/2871\n\
    \n\
Will redirect to:\n\
    https://www.google.com/')
})

app.get('/new/*',function(req, res){
  res.writeHead(200, {'Content-Type' : 'application/json'})
  var insert_object = urlContainer.InsertURLIntoContainer(req.url.slice(5))
  var short_url = 'https://url-shortener-microserver-shihung.c9users.io/' + insert_object.key;
  res.end(JSON.stringify({'original_url' : req.url.slice(5), 'short_url' :  short_url }))
})

app.get('/:Index', function(req, res){
  var query_result = urlContainer.QueryFromContainer(+req.params.Index)
  if( query_result === false ){
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Error : This short url doesn\'t exists')
  }else{
    res.redirect(query_result)
  }
})

app.get('*',function(req, res){
  res.writeHead(404,{'Content-Type' : 'text/plain'})
  res.end('404 error! it is not supported operation!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})