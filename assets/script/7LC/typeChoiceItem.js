var dataConfig = require('DataConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        logo: cc.Sprite,
        new: cc.Sprite,
        title: cc.Sprite,
        isSelect:Boolean
    },

    init: function (data) {
        this.choiceType = data.choiceType;
        this.id = data.id;
        this.setLogoImg(data.icon);
    },

    //设置玩法背景图
    setLogoImg: function (url) {
        if (url === undefined) {
            url = '';
        }
        var logoSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)), cc.Rect(0, 0, 102, 67));
        this.logo.getComponent(cc.Sprite).spriteFrame = logoSF;
    },

    //设置选中状态背景图
    setNewImg: function (url) {
        if (url === undefined) {
            url = '';
        }
        var newSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)), cc.Rect(0, 0, 0, 0));
        this.new.getComponent(cc.Sprite).spriteFrame = newSF;
    },
    
     setSelect:function (is_select) {
        this.isSelect = is_select;
        var xzkData = dataConfig.xzkData;
        var url = "";
        if(this.isSelect){
           url =  xzkData[1];
        }else{
            url =  xzkData[0];
        }
        this.setNewImg(url);
      
    }
    
});
