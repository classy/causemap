var fs = require('fs');
var http = require('http');
var path = require('path');
var async = require('async');

var client = require('../client');
var config = require('../../config');
var es_configs = config.get('elasticsearch');



var indexes = es_configs.indexes;


function installIndexes(callback){
  async.map(
    Object.keys(indexes), 
    function(index, async_callback){
      var index_name = indexes[index];
      var index_definition_path = path.join(
        __dirname,
        index + '.json'
      );
      
      // check if the file exists
      fs.exists(index_definition_path, function(exists){
        if (!exists){
          console.error(
            'Missing index definition:', 
            index_definition_path
          );

          return async_callback(null, null);
        }
  
        var request_options = {
          host: es_configs.host,
          port: es_configs.options.port,
          path: '/'+ index_name,
          method: 'PUT'
        }
  
        var request = http.request(request_options, function(response){
          return async_callback(null, response);
        });
  
        request.on('error', function(request_error){
          return async_callback(request_error, null);
        });
  
        var index_file_stream = fs.createReadStream(index_definition_path);
        index_file_stream.on('end', function(){
          request.end();
        });
  
        index_file_stream.pipe(request);
      });
    }, 
    callback || console.log
  );
}



module.exports = installIndexes;
