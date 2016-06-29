cc.Class({
    extends: cc.Component,

    properties: {
         itemPrefab: cc.Prefab,
         sceneName: "main"
    },

    // use this for initialization
    onLoad: function () {
        var item = cc.instantiate(this.itemPrefab);
        item.getComponent('Loading').loadScene(this.sceneName);
        this.node.addChild(item);
        cc.log("this.sceneName :" + this.sceneName);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
