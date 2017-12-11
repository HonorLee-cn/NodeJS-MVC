/**
 */
var Mysql = require('mysql');  

var pool;
var client = {
    getConnection:function(callback){
        if(!pool) throw new Error("Mysql pool not created!");
        if(!callback || typeof(callback)!='function') throw new Error("Mysql pool get connection lost callback!");
        pool.getConnection(function(err,connection){
            callback(err,connection);
        });
    }
}
exports.instance = function(config){
    pool = Mysql.createPool(config)
    return client;
};