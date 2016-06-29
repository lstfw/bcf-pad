var Utils = require('Utils');
var dataConfig = require('DataConfig');
cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        logo: cc.Sprite,
        new: cc.Sprite,
        date: cc.Label
    },

    // data: {id,iconSF,itemName,itemPrice}
    init: function (data) {
        this.id = data.id;
        this.setLogoImg(data.logo);
        this.setNewImg(data.new);
        this.setTime(data.endTime);
        this.schedule(function() {
            // 这里的 this 指向 component
            this.setTime(data.endTime);
        }, 0.5);
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
    setNewImg:function(url){
        if(url === undefined){
            url = '';
        }
        var newSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)), cc.Rect(0, 0, 0, 0));
        this.new.getComponent(cc.Sprite).spriteFrame = newSF;
    },

        //设置时间
    setTime:function(endTime){
       var leftTime = Utils.formatTimes(endTime,1);
        if(leftTime < 0){
            this.date.getComponent(cc.Label).string = '开奖结束';
        }else{
            this.date.getComponent(cc.Label).string = leftTime;
        }
    },

    route:function(id){
        if(id === 1){
            //3D
            dataConfig.seedType = 1;
            cc.director.loadScene('3D');
        }else if(id === 2){
            //快8
            dataConfig.seedType = 2;
            cc.director.loadScene('K8');
        }else if(id === 3){
            //快3
            dataConfig.seedType = 3;
            cc.director.loadScene('K3');
        }else if(id === 4){
            //七乐彩
            dataConfig.seedType = 4;
            cc.director.loadScene('7LC');
        }else if(id === 5){
            //双色球
            dataConfig.seedType = 5;
            cc.director.loadScene('unionLottery');
        }else if(id === 6){
            //PK10
            dataConfig.seedType = 6;
            cc.director.loadScene('PK10');
        }

    }







});
