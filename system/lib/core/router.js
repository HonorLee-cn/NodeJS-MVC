'use strict'
var Router ={
    goAsset:function(path,req,res){
        let assetFile = Core.Path.Asset+path;
        FILE.stat(assetFile,function(err,status){
            if(err || !status.isFile()){
                Router._error('No such file ['+path+']',res);
            }else{
                STATIC.load(assetFile,req,res);
            }
        });
    },
    goHandler:function(path,req,res){
        let handlerFile = Core.Path.Handler + path + '.js';
        let method = 'index';
        let pathArr = path.split('/');
        let Res = res;
        let Req = req;

        FILE.stat(handlerFile,function(err,status){
            if(err || !status.isFile()){
                method = pathArr.pop();
                if(pathArr.length<=1) return Router._error('No such handler ['+handlerFile+']',Res);
                handlerFile = Core.Path.Handler + pathArr.join('/') + '.js';
                FILE.stat(handlerFile,function(err,status){
                    if(err || !status.isFile()){
                        Router._error('No such handler ['+handlerFile+']',Res);
                    }else{
                        Router.runHandler(handlerFile,method,Req,Res);
                    }
                });
            }else{
                Router.runHandler(handlerFile,method,Req,Res);
            }
        });
    },
    runHandler:function(handlerFile,method,req,res){
        try {
            let handler = require(handlerFile);
            if(typeof handler[method]==='function'){
                let noBypass = true;
                if(typeof handler['__construct']==='function') noBypass = handler['__construct'](req,res);
                if(noBypass) handler[method](req,res);
            }else{
                Router._error('Handler ['+handlerFile+'] no such method "'+method+'"',res);
            }
        }catch(e){
            Router._error(e.stack,res);
        }
    },
    _error:function(log,res){
        LOGGER.error(log);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404');
    }
};

module.exports = function(req,res){
    let URI       = req.url=='/'?'/index':req.url;
    let URLParse  = URL.parse(URI,true);
    let URLArr    = URLParse.pathname.split('/');
    let enterURI  = String(URLArr[1])==''?'index':String(URLArr[1]);
    let isAsset   = enterURI == Config.asset_path;

    req._GET = URLParse.query;
    if(isAsset){
        let assetPath = URLArr.join('/').replace('/'+Config.asset_path,'');
        Router.goAsset(assetPath,req,res);
        return;
    }
    req._Cookie = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function(Cookie){
        let parts = Cookie.split('=');
        let key   = parts[0].trim();
        let value = (parts[1]||'').trim();
        if(parts.length>2){
            parts = parts.shift();
            value = parts.join('=').trim();
        }
        req._Cookie[key] = value;
    });
    Router.goHandler(URLParse.pathname,req,res);
    return this;
};
