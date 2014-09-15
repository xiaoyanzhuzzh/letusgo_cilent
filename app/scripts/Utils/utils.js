var Util = Util || {};
Util.localStorage = {
    getStorageItem : function (key){
       return JSON.parse(localStorage.getItem(key));
    },

    setStorageItem : function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    }

}
