'use strict';

const file = require('file'),
      rdfParser = require('./lib/rdf-parser.js'),
      async = require('async'),

      work = async.queue(function(path, done) {
          rdfParser(path, function(err, doc){
              console.log(doc);
              done();
          });
      }, 1000);

console.log('beginning directory walk');

file.walk(__dirname + '/cache', function(err, dirPath, dirs, files){
    files.forEach(function(path){
        work.push(path); 
    });
});
