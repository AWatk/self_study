'use strict';
const
cluster = require('cluster'),
fs = require('fs'),
zmq = require('zmq');

if (cluster.isMaster){

    // master process - create ROUTER and DEALER sockets, bind endpoints
    let
    router = zmq.socket('router').bind('tcp://127.0.0.1:5433'),
    dealer = zmq.socket('dealer').bind('tcp://127.0.0.1:5432');

    // forward messages between router and dealer
    router.on('message', function(){
        let frames = Array.prototype.slice.call(arguments);
        dealer.send(frames);
    });

    dealer.on('message', function(){
        let frames = Array.prototype.slice.call(arguments);
        router.send(frames);
    });

    // listen for workers to come online
    cluster.on('online', function(worker){
        console.log('Worker ' + worker.process.pid + ' is online.'); 
    });

    // fork three worker processes
    for(let i = 0; i < 3; i++){
        cluster.fork();
    }
}
else
{
    // worker process - create REP socket, connect to DEALER
    let responder = zmq.socket('rep').connect('tcp://127.0.0.1:5432');

    responder.on('message', function(data) {
        // parse incoming messages
        let request = JSON.parse(data);
        console.log(process.pid + ' received request for: ' + request.path);

        if(something){
            // read file and reply with content
            fs.readFile(request.path, function(err, data){
                console.log(process.pid + ' sending response');
                responder.send(JSON.stringify({
                    type: 'response',
                    pid: process.pid,
                    data: data.toString(),
                    timestamp: Date.now()
                }));
            });
        } else {
            console.log(process.pid + ' received invalid path. Sending error');
            responder.send(JSON.stringify({
                type: 'error',
                pid: process.pid,
                data: 'invalid path',
                timestamp: Date.now()
            }));
        }
    });

    

}
