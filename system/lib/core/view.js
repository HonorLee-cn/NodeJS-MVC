var View = function(src,params){
    if(!src) return null;

    this.html = '';
    this.params = params?params:{};

    if(!src.match(Core.Path.View)){
        src = Core.Path.View + src + '.html';
    }

    try{
        FILE.statSync(src);
        var data = FILE.readFileSync(src,'UTF-8');
        this.html = EJS.render(data,this.params);
    }catch(e){
        return null;
    }
    
    return this;
}

module.exports = View;