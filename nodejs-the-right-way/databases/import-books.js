'use strict';

const file = require('file'),
      rdfParser = require('./lib/rdf-parser.js'),
      async = require('async'),
      request = require('request'),

      work = async.queue(function(path, done) {
          rdfParser(path, function(err, doc){
              request({
                  method: 'PUT',
                  url: 'http://jeb:kerman@localhost:5984/books/' + doc._id,
                  json: doc
              }, function(err, res, body){
                  if(err) {
                      throw Error(err);
                  }
                  console.log(res.statusCode, body);
                  done();
              });
          });
      }, 1000);

console.log('beginning directory walk');

file.walk(__dirname + '/cache', function(err, dirPath, dirs, files){
    files.forEach(function(path){
        work.push(path); 
    });
});
