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
global.serverUID = (Math.ceil(Math.random()*61439+4096)).toString(16).toUpperCase();

require('./config.js');
require('./system/core.js');

let serverPort = Config.ServerPort;
try{
    require('http').createServer(serverHandler).listen(serverPort);
    LOGGER.info('Child Server ['+serverUID+'] start at port [' + serverPort + '] | ' + DateFormat('yyyy/MM/dd hh:mm:ss', new Date()));
}catch(e){
    LOGGER.error('Child Server ['+serverUID+'] failed start at port [' + serverPort + '] | ' + DateFormat('yyyy/MM/dd hh:mm:ss', new Date()));
}


function serverHandler(req,res){
    if(req.method.toLowerCase()=='post'){
        let form = new Formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            req._POST = fields;
            req._UPLOAD = files;
            new ROUTER(req,res);
        });
    }else{
        new ROUTER(req,res);
    }

}
