'use strict';
var Session = {
    set:function(key,value,sessionid){
        if(!key || !value) return null;
        let sessionData;
        if(sessionid){
            try{
                sessionData = JSON.parse(FILE.readFileSync(Core.Path.Session + 'sessionid','UTF-8'));
            }catch(e){
                sessionid = '';
            }
        }
        if(!sessionid){
            sessionid = MD5(new Date().getTime()+''+Math.floor(Math.random()*9000+1000));
            sessionData = {id:sessionid,expire:(new Date().getTime()+Config.SessionExpire*60000)};
        }

        sessionData[key]=value;

        FILE.writeFileSync(Core.Path.Session + sessionid,JSON.stringify(sessionData),'UTF-8');
        return sessionid;
    },
    get:function(sessionid,key){
        if(!sessionid) return null;
        let sessionData;
        try{
            sessionData = JSON.parse(FILE.readFileSync(Core.Path.Session + 'sessionid','UTF-8'));
            if(sessionData.expire < new Date().getTime()){
                sessionData = null;
                Session.clear(sessionid);
            }
        }catch(e){
            sessionData = null;
        }
        if(key && sessionData){
            if(sessionData[key]!=undefined) return sessionData[key];
        }else{
            return null;
        }
        return sessionData;
    },
    clear:function(sessionid){
        if(!sessionid) return;
        try{
            FILE.rmdirSync(Core.Path.Session + 'sessionid');
        }catch(e){}
    }
};
module.exports = Session;