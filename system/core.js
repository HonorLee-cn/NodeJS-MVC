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
    Temp        : ROOTPATH + '/temp',
    Session     : ROOTPATH + '/temp/session',
    Log         : ROOTPATH + '/log',
    Asset       : ROOTPATH + '/' + Config.asset_path
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
global.Formidable   = require('formidable');
global.MIME         = require('mime-types');
global.Path         = require('path');
global.Request      = require('request');

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
    let MysqlPool  = require(Core.Path.ExtraLib + '/mysql-pool.js').instance(mysqlConfig);
    
    // global.MysqlPool  = require(Core.Path.ExtraLib + '/mysql-pool.js').instance(mysqlConfig);
    // global.MysqlDB    = require(Core.Path.Helper + '/mysqldb.js');
    MysqlPool.getConnection(Core.Setting.mysql_pool.name).query('SELECT VERSION() as version',function(err,result,fields){
        if(err){
            Tracer.error('Mysql Connect error,please recheck your config');
            Tracer.error(err);
        }else{
            Tracer.info('Mysql Connect success');
            Tracer.info('Mysql Version: ' + result[0]['version'] + ' | User: ' + Config.mysql_cfg.user + ' | Database: ' + Config.mysql_cfg.database);
            global.MysqlPool = MysqlPool;
            global.MysqlDB   = require(Core.Path.Helper + '/mysqldb.js');
        }
    });
}

//If Mongodb on,load Mongodb Extension
if(Config && Config.mongodb_on && Config.mongodb_cfg && Config.mongodb_cfg.database){
    let verify = Config.mongodb_cfg.user?Config.mongodb_cfg.user+':'+Config.mongodb_cfg.password+'@':'';
    let mongoConnect = 'mongodb://' + verify + Config.mongodb_cfg.host+':'+Config.mongodb_cfg.port+'/'+Config.mongodb_cfg.database;
    require('mongodb').MongoClient.connect(mongoConnect,function(err,db){
        if(err) {
            Logger.error('MongoDB connect error!',true);
            Logger.error('Server start failed. Log has been saved!');
            // Logger.out(err);
            return;
        }
        Tracer.info('Mongodb Connect success');
        global.MongoDB = {db:db};
        
    });
}

//Check File Paths
for(let path in global.Core.Path){
    try{
        FILE.statSync(global.Core.Path[path]);
    }catch(e){
        FILE.mkdirsSync(global.Core.Path[path]);
    }
}
