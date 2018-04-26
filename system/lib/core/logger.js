/** Logger **/
const colors = require('colors');

var Logger = {
    log:function(msg){
        console.log('['+serverUID+'][LOG] '+msg);
        if(Config.write_log_file) this.out('log',msg);
    },
    info:function(msg){
        console.log(('['+serverUID+'][INF] '+msg).green);
        if(Config.write_log_file) this.out('info',msg);
    },
    debug:function(msg){
        if(Config.debug) console.log(('['+serverUID+'][DEBUG] '+msg).yellow);
        // if(Config.write_log_file) this.out('debug',msg);
    },
    error:function(msg){
        console.log(('['+serverUID+'][ERR] '+msg).red);
        if(Config.write_error_file) this.out('error',msg);
    },
    out:function(level,msg){
        Tracer[level](msg);
    }
};

module.exports = Logger;