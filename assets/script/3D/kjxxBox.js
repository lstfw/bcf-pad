var dataConfig = require('DataConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        kjItem:cc.Prefab
    },

    onLoad: function () {
        var kjData_3D = dataConfig.kjData_3D
        for (var i = 0; i < kjData_3D.length; ++i) {
            var item = cc.instantiate(this.kjItem);
            item.getComponent('kjxxItem').init(kjData_3D[i]);
            this.node.addChild(item);
        }
    }
});
