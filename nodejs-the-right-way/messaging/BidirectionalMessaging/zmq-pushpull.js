'use strict';
const
cluster = require('cluster'),
fs = require('fs'),
zmq = require('zmq');

if (cluster.isMaster){

    // master process - create ROUTER and DEALER sockets, bind endpoints
    let
    push = zmq.socket('push').bind('tcp://127.0.0.1:5433'),
    pull = zmq.socket('pull').bind('tcp://127.0.0.1:5432'),
    readyCount = 0;

    function startJobs(){
        for(let i = 0; i < 30; i++){
            console.log('Pushing a job');
            push.send(JSON.stringify({
                type: 'job'
            }));
        }
    };
    
    pull.on('message', function(data){
        var msg = JSON.parse(data);
        if(msg.type === 'ready'){
            readyCount++;
            console.log('Worker ' + msg.data + ' is ready!');
            if(readyCount >= 3){
                startJobs();
            }
        } else if (msg.type === 'result'){
            console.log(msg.data);
        } else {
            throw Error('Invalid message type from worker');
        }
    });


    // listen for workers to come online
    cluster.on('online', function(worker){
        console.log('Worker ' + worker.process.pid + ' is online.');
    });

    // listen to see if a worker dies and spawn another
    cluster.on('disconnect', function(worker){
        console.log('Worker ' + worker.process.pid + ' went offline. Spawning a new worker');
        cluster.fork();
    })

    // fork three worker processes
    for(let i = 0; i < 3; i++){
        cluster.fork();
    }
}
else
{
    // worker process - create REP socket, connect to DEALER
    let pull = zmq.socket('pull').connect('tcp://127.0.0.1:5433'),
        push = zmq.socket('push').connect('tcp://127.0.0.1:5432');

    pull.on('message', function(data) {
        // parse incoming messages
        let msg = JSON.parse(data);
        if(msg.type === 'job'){
            push.send(JSON.stringify({
                type: 'result',
                data: process.pid
            }))
        } else {
            throw Error('Invalid message type from Master');
        }
    });

    push.send(JSON.stringify({
        type: 'ready',
        data: process.pid
    }));

    

}
