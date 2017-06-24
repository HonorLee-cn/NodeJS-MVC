module.exports = {
    __construct:function(){
        global.H = function(healperName){
            if(!healperName){
                LOGGER.error('Helper name undefined!!');
                return null
            }
            try{
                FILE.statSync(Core.Path.Helper + '/'+healperName+'.js');
            }catch(e){
                LOGGER.error('No such helper ['+healperName+']');
                return null;
            }
            return require(Core.Path.Helper + '/'+healperName+'.js');
        }
    }
}