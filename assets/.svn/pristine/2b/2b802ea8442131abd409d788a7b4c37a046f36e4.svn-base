var dataConfig = require('DataConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        qi: cc.Label,
        betType: cc.Label,
        amountInf: cc.Label,
        delItem: cc.Node,
        betTypeH: cc.Label,
        nub: cc.Label,
    },

    init: function (data, betTypeH) {
        this.qi.string = data.stage;
        this.amountInf.string = data.amountInf;
        this.betType.string = data.betType;
        this.betTypeH.string = betTypeH;
        this.subGroup(data.selectionData);
        this.clearItem();
    },


    //分组
    subGroup: function (data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(data[i].toString());
        }
        this.nub.string = arr.join('  ');
    },


    //删除一行
    clearItem: function () {
        var seedType = 'seed3D'
        if (dataConfig.seedType == 2) {
            seedType = 'k8';
        } else if (dataConfig.seedType == 6) {
            seedType = 'PK10';
        }

        var canvasN = cc.find("Canvas").getComponent(seedType);
        this.delItem.on('touchend', function (event) {
            var item = event.target.parent,
                index = item.getSiblingIndex();
            this.node.removeFromParent();
            canvasN.delLine(index);
        }, this);
    },


});
