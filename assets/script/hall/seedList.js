var dataConfig = require('DataConfig');
cc.Class({
    extends: cc.Component,
    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad: function () {
        var seedData = dataConfig.seedData
        for (var i = 0; i < seedData.length; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.getComponent('seedBox').init(seedData[i]);
            this.node.addChild(item);
        }

    },
    addEventBtn:function(item){
        item.on('touchend', function (event) {
            var seedBox = event.target.getComponent('seedBox');
            var id = seedBox.id;
            seedBox.route(id);
        }, this);
    }
});
