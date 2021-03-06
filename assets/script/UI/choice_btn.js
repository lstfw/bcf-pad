cc.Class({
    extends: cc.Component,

    properties: {
        bgSF: {
            default: [],
            type: cc.SpriteFrame
        },
        bg: cc.Sprite,
        text: cc.Sprite
    },


    init: function (data) {
        this.text.getComponent(cc.Sprite).spriteFrame = data;
    },


    setBg: function (type) {
        var bgSF = this.bgSF[0];
        if (type === 0) {
            bgSF = this.bgSF[1];
        }
        this.bg.getComponent(cc.Sprite).spriteFrame = bgSF;
    },


});
