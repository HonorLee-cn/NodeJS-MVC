/*
NodeJS-MVC 1.0
--------------------
HonorLee
http://honorlee.me
dev@honorlee.me
*/

'use strict';

//Master Process
//DO NOT CHANGE ANYTHING IN THIS FILE!

//Max number of worker,'auto' would be fine
let max_child_process   = 2;
//If turn loadBalancing on,master process will forward all request to child process.Recommend NGINX for instant.
let loadBalancing       = false;
let child_port_start    = 8000;
// let socketIO     = require('socket.io')(socketServer);

let childNumber = max_child_process=='auto'?require('os').cpus().length:Number(max_child_process);
for(let i = 0; i<max_child_process; i++){
    require('child_process').fork('./server_worker.js',['-p',child_port_start+i]);
}
