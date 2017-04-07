'use strict'
module.exports={
    query:function(query,callback){
        let mysql = MysqlPool.getConnection(Core.Setting.mysql_pool.name);
        mysql.query(query,function(err, results, fields) {  
            callback(err,results,fields);
            MysqlPool.freeConnection(mysql);
        });
    }
};