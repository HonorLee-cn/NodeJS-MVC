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

global.M = function(table){
    if(!table) return null;
    return new Module(Config.mysql_cfg.prefix+table);
};

var Module = function(table){
    let instance = this;
    let tableName = table;
    let method,where;
    let rows,value;

    instance.get = function(row){
        method = 'select';
        if(!row) row = '*';
        if(typeof row ==='string') rows = row.split(',');
        if(typeof row ==='object' && row.length) rows = row;
        return instance;
    };
    instance.update = function(row,val){
        method = 'update';
        if(!val) return instance;
        let rowArr,valArr,pair;
        if(typeof row ==='string') rowArr = row.split(',');
        if(typeof row ==='object' && row.length) rowArr = row;
        if(typeof val ==='string') valArr = val.split(',');
        if(typeof val ==='object' && val.length) valArr = val;
        if(rowArr.length == valArr.length){
            for(let i in rowArr){
                if(Number(valArr[i])==valArr[i]){
                    valArr[i] = Number(valArr[i]);
                }else{
                    valArr[i] = '"'+String(valArr[i])+'"';
                }
            }
            rows  = rowArr.join(',');
            value = valArr.join(',');
        }
        return instance;
    };
    instance.del = function(){

    };
    instance.where = function(row,val){
        if(!row || !val) return instance;
        let rowArr,valArr;
        if(typeof row ==='string') rowArr = row.split(',');
        if(typeof row ==='object' && row.length) rowArr = row;
        if(typeof val ==='string') valArr = val.split(',');
        if(typeof val ==='object' && val.length) valArr = val;
        if(rowArr.length == valArr.length){
            where = [];
            for(let i in rowArr){
                if(Number(valArr[i])==valArr[i]){
                    valArr[i] = Number(valArr[i]);
                }else{
                    valArr[i] = '"'+String(valArr[i])+'"';
                }
                where.push(([rowArr[i],valArr[i]]).join('='));
            }
        }
        return instance;
    };
    instance.run = function(callback){
        let query = [],queryStr;
        let whereStr = where?('where '+where.join(' and ')):'';
        switch(method){
            case 'select':
                query = ['select',rows.join(','),'from',tableName,whereStr];
                break;
            case 'update':
                query = ['update',tableName,'set','(',rows.join(','),')','values(',value.join(','),')',whereStr];
                break;
        }
        queryStr = query.join(' ');
        MysqlDB.query(queryStr,function(err,result,fields){
            if(callback && typeof callback === 'function') callback(err,result);
        })
    }
};