var dataConfig = require('DataConfig');
cc.Class({
    extends: cc.Component,
    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad: function () {
        var gameData = dataConfig.gameData;

        for (var i = 0; i < gameData.length; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.getComponent('gameBox').init(gameData[i]);
            this.node.addChild(item);
        }

    },
    addEventBtn:function(item){
        item.on('touchstart', function (event) {
            var gameBox = event.target.getComponent('gameBox');
            var id = gameBox.id;
            gameBox.route(id);
        }, this);
    }
});
