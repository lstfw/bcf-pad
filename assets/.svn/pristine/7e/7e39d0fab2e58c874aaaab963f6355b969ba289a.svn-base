cc.Class({
    extends: cc.Component,

    properties: {
        bgSF: {
            default: [],
            type: cc.SpriteFrame
        },
        bg: cc.Sprite,
        text: cc.Sprite,
        type: 0,
        PK10BtnSFDown: {
            default: [],
            type: cc.SpriteFrame
        },
        PK10BtnSFDef: {
            default: [],
            type: cc.SpriteFrame
        },
        id:0,
    },

    setText: function (data,id) {
        this.text.getComponent(cc.Sprite).spriteFrame = data;
        this.id = id;
    },


    setBg: function (type, i) {
        var bgSF = this.bgSF[0],
            textSF = this.PK10BtnSFDef[i];
        if (type === 0) {
            bgSF = this.bgSF[1];
            textSF = this.PK10BtnSFDown[i]
            this.type = 1;
        } else {
            this.type = 0;
        }
        this.text.getComponent(cc.Sprite).spriteFrame = textSF;
        this.bg.getComponent(cc.Sprite).spriteFrame = bgSF;
    },
});
