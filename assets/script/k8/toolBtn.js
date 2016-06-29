cc.Class({
    extends: cc.Component,

    properties: {
        bgSF: {
            default: [],
            type: cc.SpriteFrame
        },
        type: 0,
        color: {
            default: [],
            type: cc.Color
        },
        bg: cc.Sprite,
        text: cc.Label
    },

    //设置遗漏和球的号码
    setNub: function (nub) {
        this.text.string = nub;
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
        this.text.node.color = color;
        this.bg.getComponent(cc.Sprite).spriteFrame = bgSF;
    }
});
