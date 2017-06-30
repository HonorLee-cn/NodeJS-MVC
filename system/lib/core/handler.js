var Handler = {
    // getViewPath:function(path){
    //     var request = URL.parse(VIEWSPATH+path,true);
    //     var FileName = request.pathname+'.html';

    //     if(FILE.existsSync(FileName)){
    //         return FileName;
    //     }else{
    //         return null;
    //     }
    // },
    // getView:function(path){
    //     var FileName = this.getViewPath(path);
    //     if(FileName){
    //         return FILE.readFileSync(FileName,'utf8');
    //     }else{
    //         return null;
    //     }

    // },
    response:function(res,data){
        if(!res) return;
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.write(data);
        res.end();
    },
    apiResponse:function(res,data){
        if(!res) return;
        data = data?{success:1,result:data}:{success:1};
        res.writeHead(200, {'Content-Type': 'text/json; charset=UTF-8'});
        res.write(JSON.stringify(data));
        res.end();
    },
    apiErrorResponse:function(res,msg){
        if(!res) return;
        msg = msg?{success:0,msg:msg}:{success:0};
        res.writeHead(200, {'Content-Type': 'text/json; charset=UTF-8'});
        res.write(JSON.stringify(msg));
        res.end();
    }
}

module.exports = Handler;