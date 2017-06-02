const express = require('express')
const app = express()

var container = new Array(0)

function InsertURLMap(url){
  var found_url = false
  var Data;
  
  for(var index = 0; index < container.length; ++index){
    if(container[index].value === url){
      found_url = true
      Data = {key : index, value : url}
    }
  }
  
  if(!found_url){
    Data = {key : container.length, value : url}
    container[container.length] = Data
  }
  
  return Data;
  
  // Debug Info
  /*console.log('Print container data : ')
  container.forEach(function(element, index, arr){
    console.log(element)
  })
  console.log('Print end\n')*/
  
}

function FindIndexFromContainer(index){
  for(var i = 0; i < container.length; ++i){
    if(container[i].key === index){
      return container[i].value
    }
  }
  return false
}

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
  var insert_object = InsertURLMap(req.url.slice(5))
  var short_url = 'https://url-shortener-microserver-shihung.c9users.io/' + insert_object.key;
  res.end(JSON.stringify({'original_url' : req.url.slice(5), 'short_url' :  short_url }))
})

app.get('/:Index', function(req, res){
  var data = FindIndexFromContainer(+req.params.Index)
  if( data === false ){
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Error : This short url doesn\'t direct to any website')
  }else{
    res.writeHead(200, {'Content-Type' : 'text/plain'})
    res.end('Will re-direct to new website later, website : ' + data.toString())
  }
  
})

app.get('*',function(req, res){
  res.writeHead(404,{'Content-Type' : 'text/plain'})
  res.end('404 error! it is not supported operation!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})