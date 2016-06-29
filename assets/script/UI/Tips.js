cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Label,
        isShow:Boolean,
    },

    // use this for initialization
    onLoad: function () {
       this.node.opacity = 0;
       this.node.active = false;
       this.isShow = false;
    },

    
    setContentText:function (text) {
        
    },
    
    show:function(text,px=0,py=0){
        if(this.isShow) return;
        this.isShow = true;
        this.x = px;
        this.y = py;
        this.content.string = text;
        this.node.opacity = 255;
        this.node.active = true;
        this.effect();   
        cc.log("is show:"+ this.isShow);
    },
    
    effectCallFunc:function () {
         this.isShow = false;
         cc.log("is show:"+ this.isShow);
    },
    
    effect:function () {
        var delayTime = cc.delayTime(1);
        var fadeOut = cc.fadeOut(0.5);
        var fadeIn = cc.fadeIn(0.5);
       var callFunc = cc.callFunc(this.effectCallFunc,this);
        var seq = cc.sequence(fadeIn,delayTime,fadeOut,callFunc);
        this.node.runAction(seq);
    }
 
});
