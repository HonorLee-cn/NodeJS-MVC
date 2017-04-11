global.Config = {
    //Session ExpireTime min.
    SessionExpire : 30,
    //Asset path
    asset_path  : 'asset',
    //WhiteList
    BlackList : {
        // Static  : /static|images|robots\.txt|crossdomain\.xml|favicon\.ico/,
        // Handler : /index|report/
    },
    //Mysql config
    mysql_on : false,
    mysql_cfg : {
        host:'localhost',
        port:3389,
        user:'root',
        password:'',
        database:'',
        prefix:''
    },
    //Mongodb config
    mongodb_on : false,
    mongodb_cfg : {
        host:'localhost',
        port:27017,
        user:null,
        password:'',
        database:'',
        prefix:''

    },
    //If Debug on,log && info logs will output in console;except Error!
    debug:true,
    //if write file on,logs will write in log files
    write_log_file:true,
    write_error_file:true
};