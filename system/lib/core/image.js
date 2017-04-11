'use strict'
//TODO Rewrite
var mime = require('mime-types');
var Image = {
    load:function(path,ext,req,res){
        let data,pathArr,opts={},tmpFile;
        if(FILE.existsSync(path)){
            try{
                data = FILE.readFileSync(path,'binary');
                res.writeHead(200, { "Content-Type": mime.lookup(ext)});
                res.end(data,'binary');
                return true;
            }catch(err){
                Image._error();
            }
        }else{
            // console.log(err);
            Image._error(res);
        }

    },
    _error:function(res){
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
}
module.exports = Image;