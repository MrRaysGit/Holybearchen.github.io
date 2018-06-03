'use strict'

var FlagItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.key=obj.key;
        this.timestamp=obj.timestamp;
        this.name = obj.name;
        this.content = obj.content;
        this.author = obj.author;
    }
};

FlagItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

//绑定属性
var TheFlag = function () {
    LocalContractStorage.defineMapProperty(this, "flagKey");
    LocalContractStorage.defineProperty(this, "size");
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new FlagItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

TheFlag.prototype ={
    init:function(){
        this.size=0;
    },

    save:function(name,content){
        if(!name || !content){
            throw new Error("empty name or content")
        }

        if(name.length > 20 || content.length > 500){
            throw new Error("name or content  exceed limit length")
        }

        var key=this.size;
        var timestamp = Date.parse(new Date());

        var from = Blockchain.transaction.from;
        var flagItem = this.data.get(name);

        
        var flagItem = new FlagItem();

        flagItem.key=key;
        flagItem.author = from;
        flagItem.name = name;
        flagItem.content = content;
        flagItem.timestamp=timestamp;
        var index = this.size;
        this.flagKey.set(index,key);
        this.data.put(key,flagItem);

        this.size=this.size+1;
    },

    getByName:function(name){
        if(!name){
            throw new Error("empty name")
        }
        return this.data.get(name);
    },

    get:function(key){
        key = key.trim();
        if (key === "") {
          throw new Error("empty key")
        }
        return this.data.get(key);
    },

    list: function (limit,offset){
        limit = parseInt(limit);
        offset = parseInt(offset);
        var number = offset * (limit+1);
        if(number > this.size){
          number = this.size;
        }
        var list = [];
        for(var i=limit;i<number;i++){
          var key = this.flagKey.get(i);
          var object = this.data.get(key);
          list.push(object)
        }
        // return list;
        return list
        //return {"data":"success","content":this.starVote};
    }
}

module.exports = TheFlag;