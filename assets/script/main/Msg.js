var DataConfig = require('DataConfig');
var Utils = require('Utils');
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        oldIndex:0
    },

    // use this for initialization
    onLoad: function () {
        var arr = DataConfig.news;
        this.label.string = arr[0];
        this.textEffect();
    },
    
    updateText : function () {
        var arr = DataConfig.news;
        var index = Utils.getRandomNum(0,arr.length-1);
        while (true) {
            if(this.oldIndex == index){
                index = Utils.getRandomNum(0,arr.length-1);
            }else{
                this.oldIndex = index;
                break;
            } 
        }
        this.label.string = arr[index];
    },
    
    textEffect : function () {
        var  tintTo1 = cc.tintTo(2, 255, 0, 0);
        var delayTime = cc.delayTime(1);
        var fadeOut = cc.fadeOut(1);
        var fadeIn = cc.fadeIn(1);
        var tintTo2 =  cc.tintTo(2, 255, 255, 255);
        var callFunc = cc.callFunc(this.updateText,this);
        var seq = cc.sequence(tintTo1, delayTime, fadeOut, delayTime, callFunc,fadeIn, delayTime, tintTo2);
        this.node.runAction(cc.repeatForever(seq));
    },    
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
