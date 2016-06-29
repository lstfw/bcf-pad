var Item = cc.Class({
    name: 'Item',
    properties: {
        iconSF: cc.SpriteFrame
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        Bg: cc.Sprite,
        text: cc.Label,
        bgS:{
            default: [],
            type: Item
        }
    },

    init:function(data){
        this.text.string = data;
    },


    //选中设置球背景图
    setLogoImg:function(type){
        var logoSF = this.bgS[0].iconSF;
        if(type === 0){
            logoSF = this.bgS[1].iconSF;
        }
        //logoSF.setRect(cc.Rect(0, 0, 150, 50));
        this.Bg.getComponent(cc.Sprite).spriteFrame = logoSF;
    }
});
