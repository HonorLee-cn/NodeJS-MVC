/*
* NodeJS-MVC 1.0
* --------------------
* HonorLee
* http://honorlee.me
* dev@honorlee.me
 */

/*
* Worker Process
  DO NOT CHANGE ANYTHING IN THIS FILE!
 */
global.ROOTPATH = __dirname;
require('./config.js');
require('./system/core.js');
Commander
    .version('1.0.0')
    .option('-p, --port [type]', 'server port')
    .parse(process.argv);

let serverPort = Number(Commander.port);
if(!serverPort || serverPort==0){
    LOGGER.error('Child Server start faile port ['+serverPort+'] | '+DateFormat('yyyy/MM/dd hh:mm:ss',new Date()));
}

require('http').createServer(serverHandler).listen(serverPort);
LOGGER.info('Child Server start at port [' + serverPort + '] | ' + DateFormat('yyyy/MM/dd hh:mm:ss', new Date()));

function serverHandler(req,res){
    // var COOKIE = {};
    // req.headers.cookie && req.headers.cookie.split(';').forEach(function(Cookie){
    //     let parts = Cookie.split('=');
    //     COOKIE[parts[0].trim()] = (parts[1]||'').trim();
    // });
    // req.cookie = COOKIE;
    // ROUTER.go(res,req);
    console.log(serverPort);
}
