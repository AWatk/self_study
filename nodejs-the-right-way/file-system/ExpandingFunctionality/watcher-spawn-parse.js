/*
  "use strict"
  const fs = require('fs');
  const spawn = require('child_process').spawn;
  const filename = process.argv[2];

  if(!filename){
  throw Error("A file to watch must be specified!");
  }

  if(fs.existsSync(filename)){
  var watcher = fs.watch(filename, function(eventtype,wfilename) {
  if(eventtype === 'rename'){
  process.stdout.write(wfilename + ' has been moved or deleted!\n');
  watcher.close();
  }
  else if (eventtype === 'change') {//eventtype only has two options, no need for else if
  process.stdout.write(wfilename + ' has changed!\n');
  let
  ls = spawn('ls', ['-lh', filename]),
  output = '';
  ls.stdout.on('data', function (chunk){
  output += chunk.toString();
  });
  ls.on('close', function(){
  let parts = output.split(/\s+/);
  console.dir([parts[0], parts[4], parts[8]]);
  });
  }
  });
  console.log("Now watching " + filename + " for changes...");
  } else {
  console.log(filename + " does not exist!");
  }
*/

/*
 * Modify the above code to:
 *   1. Take in the process to spawn from cli
 *   2. Pass in arbitrary numbers of additional parameters for the process
 * Ex: node watcher-spawn-parse.js ../files/target.txt ls -l -h
 */

"use strict"
const fs = require('fs');
const spawn = require('child_process').spawn;

const filename = process.argv[2];
const procCall = process.argv[3];
var params = process.argv.filter(function(item,index){
    return index > 3; 
});
if(!params){
    params = [];
}
params.push(filename);

//check passed in parameters
if(!filename){
    throw Error("A file to watch must be specified!");
}
if(!procCall){
    throw Error("A process to call upon file change must be specified");
}

if(fs.existsSync(filename)){
    var watcher = fs.watch(filename, function(eventtype,wfilename) {
        if(eventtype === 'rename'){
            process.stdout.write(wfilename + ' has been moved or deleted!\n');
            watcher.close();
        }
        else if (eventtype === 'change') {//eventtype only has two options, no need for else if
            process.stdout.write(wfilename + ' has changed!\n');
            spawnProcess(filename, procCall, params);
        }
    });
    console.log("Now watching " + filename + " for changes...");
} else {
    console.log(filename + " does not exist!");
}

function spawnProcess(filename, p, params) {
    let
    ls = spawn(p, params),
    output = '';
    ls.stdout.on('data', function (chunk){
        output += chunk.toString();
    });
    ls.on('close', function(){
        console.dir(output);
    });

}
