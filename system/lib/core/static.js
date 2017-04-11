'use strict'
//TODO Rewrite
var Static = {
    load:function(assetFile,req,res){
        let ext = Path.extname(assetFile);
        if(!ext||ext==''){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
            return;  
        }
        if(ext.match(/png|jpg|jpeg|gif/)){
            IMAGE.load(URL.parse(assetFile,true).pathname,ext,req,res);
        }else if(FILE.existsSync(assetFile)){
            var data;
            if(ext.match(/txt|js|css|html|json/)){
                try{
                    data = FILE.readFileSync(assetFile,'utf-8');
                }catch(err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end();
                    return false;            
                }
                if(ext.match(/json/)){
                    res.writeHead(200, { "Content-Type": MIME.lookup(ext)+';charset=utf-8'});
                    res.end(data,'utf-8');
                }else{
                    res.writeHead(200, { "Content-Type": MIME.lookup(ext)+';charset=utf-8','Content-Encoding':'gzip'});
                    res.end(data,'utf-8');
                }
                 //console.log(query)   
            }else if(ext.match(/json/)){
            }else{
                try{
                    data = FILE.readFileSync(assetFile,'binary');
                    res.writeHead(200, { "Content-Type": MIME.lookup(ext),"Access-Control-Allow-Origin":"*"});
                    res.end(data,'binary');
                }catch(err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end();
                }
            }
        }else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        }
    }
}

module.exports=Static;