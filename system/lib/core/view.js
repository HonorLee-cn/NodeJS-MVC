var View = function(src,params){
    if(!src) return null;

    this.html = '';
    this.params = params?params:{};

    let viewPath = src;
    if(!src.match(Core.Path.View)){
        viewPath = Core.Path.View + '/' + src + '.html';
    }
    try{
        FILE.statSync(viewPath);
    }catch(e){
        LOGGER.error('No such view template ['+src+']');
        return null;
    }

    try{
        var data = FILE.readFileSync(viewPath,'UTF-8');
        this.html = EJS.render(data,this.params);
    }catch(e){
        LOGGER.error('View template render error ['+src+']');
        LOGGER.error(e);
        return null;
    }
    
    return this;
}

module.exports = View;