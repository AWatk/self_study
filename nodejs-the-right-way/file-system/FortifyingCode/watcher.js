/*
  const fs = require('fs');
  const filename = process.argv[2];
  if(!filename){
  throw Error("A file to watch must be specified!");
  }
  fs.watch(filename, function() {
  console.log("File " + filename + " just changed!");
  });
  console.log("Now watching " + filename + " for changes...");
*/

/*
 * Fix the above code to handle:
 *  1. target file not existing  DONE
 *  2. file-under-watch is deleted DONE
 */


const fs = require('fs');
const filename = process.argv[2];
if(!filename){
    throw Error("A file to watch must be specified!");
}
if(fs.existsSync(filename)){
    watcher = fs.watch(filename, function(eventtype, wfilename) {
        if(eventtype === 'rename'){
            process.stdout.write(wfilename + ' has been moved or deleted!\n');
            watcher.close();
        }
        else if (eventtype === 'change') {//eventtype only has two options, no need for else if
            process.stdout.write(wfilename + ' has changed!\n');
        }
    });
    console.log("Now watching " + filename + " for changes...");
} else {
    console.log(filename + " does not exist!");
}

