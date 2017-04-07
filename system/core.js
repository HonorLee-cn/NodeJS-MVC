'use strict';
global.Core = {};

//Global Path
global.Core.Path = {
    System      : ROOTPATH + '/system',
    CoreLib     : ROOTPATH + '/system/lib/core',
    ExtraLib    : ROOTPATH + '/system/lib/extra',
    Helper      : ROOTPATH + '/system/lib/helper',
    Work        : ROOTPATH + '/app',
    Module      : ROOTPATH + '/app/modules',
    Handler     : ROOTPATH + '/app/handlers',
    View        : ROOTPATH + '/app/view',
    Static      : ROOTPATH + '/app/static',
    Temp        : ROOTPATH + '/temp',
    Session     : ROOTPATH + '/temp/session',
    Log         : ROOTPATH + '/log'

};

//Global Extension Require
global.Commander    = require('commander');
global.URL          = require('url');
global.FILE         = require('fs-extra');
global.EJS          = require('ejs');
global.ASYNC        = require('async');
global.Base64       = require('js-base64');
global.MD5          = require('md5');
global.DateFormat   = require('date-format');
global.Tracer       = require('tracer').dailyfile({root:Core.Path.Log,format : "{{timestamp}} <{{title}}> {{file}}:{{line}} {{message}}", dateformat : "HH:MM:ss.L"});

//System Library load
let CoreLibFiles = FILE.readdirSync(Core.Path.CoreLib);
CoreLibFiles.forEach(function(filename){
    let nameWithOutMimeType = (filename.split('.')[0]).toUpperCase();
    try {
        global[nameWithOutMimeType] = require(Core.Path.CoreLib + '/' + filename);
    }catch(e){
        console.log('[Core] Core library file ['+filename+'] load error!');
        Tracer.error('[Core] Core library file ['+filename+'] load error!');
    }
});
//System Library load end


//Core Setting,just change it if necessary!
global.Core.Setting = {
    //Mysql connect pool setting
    mysql_pool:{
        name: 'NMVCPOOL',
        maxconn: 5
    }
};

//If Mysql on,load Mysql Extension
if(Config && Config.mysql_on && Config.mysql_cfg){
    let mysqlConfig = {
        pool:Core.Setting.mysql_pool,
        db:Config.mysql_cfg
    };
    global.MysqlPool  = require(Core.Path.ExtraLib + '/mysql-pool.js').instance(mysqlConfig);
    global.MysqlDB    = require(Core.Path.Helper + '/mysqldb.js');
}

//Check File Paths
for(let path in global.Core.Path){
    try{
        FILE.statSync(global.Core.Path[path]);
    }catch(e){
        FILE.mkdirsSync(global.Core.Path[path]);
    }
}
