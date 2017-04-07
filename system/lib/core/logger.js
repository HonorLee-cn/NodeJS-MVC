/** Logger **/
const colors = require('colors');

var Logger = {
    log:function(msg){
        if(Config.debug) console.log(('[LOG] '+msg).yellow);
        if(Config.write_log_file) this.out('log',msg);
    },
    info:function(msg){
        if(Config.debug) console.log(('[INF] '+msg).green);
        if(Config.write_log_file) this.out('info',msg);
    },
    error:function(msg){
        console.log(('[ERR] '+msg).red);
        if(Config.write_error_file) this.out('error',msg);
    },
    out:function(level,msg){
        Tracer[level](msg);
    }
};

module.exports = Logger;