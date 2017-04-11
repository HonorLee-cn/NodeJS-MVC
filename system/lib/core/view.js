var View = function(src,params){
    if(!src) return null;

    this.html = '';
    this.params = params?params:{};

    if(!src.match(Core.Path.View)){
        src = Core.Path.View + src;
    }

    if(FILE.existsSync(src)){
        var data = FILE.readFileSync(src,'UTF-8');
        this.html = EJS.render(data,this.params);
    }else{
        return null;
    }
    
    return this;
}

module.exports = View;