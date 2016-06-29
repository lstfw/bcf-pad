cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    // use this for initialization
    init: function () {
       
    },
    
    loadScene:function(sceneName){
         var item = cc.instantiate(this.itemPrefab);
        item.getComponent('Loading').loadScene(sceneName);
        this.node.addChild(item);
    }
    
   
});
