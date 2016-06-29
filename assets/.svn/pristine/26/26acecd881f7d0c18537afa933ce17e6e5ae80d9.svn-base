cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        logo: cc.Sprite,
        projector: cc.Sprite
    },

    // data: {id,iconSF,itemName,itemPrice}
    init: function (data) {
        this.id = data.id;
        this.setLogoImg(data.logo);
        this.setProjectorImg(data.projector);
    },

    //设置采种背景图
    setLogoImg:function(url){
        if(url === undefined){
            url = '';
        }
        var logoSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)), cc.Rect(0, 0, 102, 67));
        this.logo.getComponent(cc.Sprite).spriteFrame = logoSF;
    },

    //设置新标背景图
    setProjectorImg:function(url){
        if(url === undefined){
            url = '';
        }
        var projectorSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)), cc.Rect(0, 0, 0, 0));
        this.projector.getComponent(cc.Sprite).spriteFrame = projectorSF;
    },

    route:function(id){
        if(id === 1){
            //3D
            console.log('幸运轮');

        }else if(id === 2){
            //快8
            console.log('PK10');

        }else if(id === 3){
            //快3
            console.log('好运中来');

        }else if(id === 4){
            //七乐彩
            console.log('天天有喜');

        }else if(id === 5){
            //双色球
            console.log('搓牌大师');

        }else if(id === 6){
            //PK10
            console.log('恭喜发财');
        }
    }




});
