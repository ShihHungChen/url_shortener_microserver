var container = new Array(0);

function InsertURLIntoContainer(url){
    var found_url = false
    var Data;
  
    for(var index in container){
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

function QueryFromContainer(index){
    for(var i in container){
       if(container[i].key === index){
         return container[i].value
       }
     }
     return false
}

exports.InsertURLIntoContainer = InsertURLIntoContainer
exports.QueryFromContainer = QueryFromContainer
