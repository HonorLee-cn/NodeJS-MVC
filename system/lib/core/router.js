'use strict'
var Router ={
    go:function(res,req){
        let url = req.url=='/'?'/index':req.url;
        let URLParse = URL.parse(url,true);
        let URLArr = URLParse.pathname.split('/');
        let query = URLParse.query;
        let enterURI = String(URLArr[1]);
        if(enterURI=='') enterURI='index';

        if(enterURI.match(WhiteList.HandlerRules)){
            return Router.getHandler(url,res,req);
        }else if(enterURI.match(WhiteList.StaticRules)){
            return STATIC.load(ROOTPATH+URLParse.pathname,query,res);
        }else{
            Router._error('Router Go ERROR:'+url,res);
            Logger.error(url+' WhiteList Check error!');
        }
    },
    getHandler:function(url,res,req){
        let URLParse = URL.parse(HANDLERPATH+url,true);
        let URLArr = URLParse.pathname.split('/');
        if(URLArr[URLArr.length-1]=='') URLArr[URLArr.length-1]='index';
        let FileName = URLArr.join('/')+'.js';
        let mod,call='index';
        if(!FILE.existsSync(FileName)){
            call = URLArr.pop();
            FileName = URLArr.join('/')+'.js';
        }
        try{
            mod = require(FileName);
            if(mod['__construct']){
                let cons = mod['__construct'](res,req,URLParse.query);
                if(cons && cons.status=='error') Router._error('Router Go ERROR:'+cons.msg,res);
            }
            mod[call](res,req,URLParse.query);
        }catch(err){
            Logger.error(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('404');
        }
    },
    _error:function(log,res,req){
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404');
    }
};

module.exports = Router;
