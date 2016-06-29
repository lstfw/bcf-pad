cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        nub: cc.Label,
        miss: cc.Label,
        ballBg: cc.Sprite,
        bgSF: {
            default: [],
            type: cc.SpriteFrame
        },
        color: {
            default: [],
            type: cc.Color
        },
        type: 0
    },

    //设置遗漏和球的号码
    setNub: function (nub, miss) {
        if (miss > 20) {
            var color = this.color[0]
            this.miss.node.color = color;
        }
        this.id = nub;
        this.nub.string = nub;
        this.miss.string = miss;
    },
    //设置球的背景   0正常  1选中
    setBg: function (type) {
        var bgSF = this.bgSF[0];
        var color = this.color[0];
        if (type === 0) {
            bgSF = this.bgSF[1];
            color = this.color[1];
            this.type = 1;
        } else {
            this.type = 0;
        }
        this.nub.node.color = color;
        this.ballBg.getComponent(cc.Sprite).spriteFrame = bgSF;
    }

});
