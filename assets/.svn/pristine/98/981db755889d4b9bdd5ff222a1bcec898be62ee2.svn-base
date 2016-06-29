cc.Class({
    extends: cc.Component,

    properties: {
        issueText:cc.Label,
        HzText:cc.Label,
        typeText:cc.Label,
        ball1:cc.Sprite,
        ball2:cc.Sprite,
        ball3:cc.Sprite
    },

    init:function(data){
        this.issueText.string = data.issue;
        var hz = data.balls[0]+data.balls[1]+data.balls[2];
        this.HzText.string = hz;
        var dx =  (hz >= 11 ) ? "大" : "小";
        var ds = ( hz%2 == 0 ) ? "双" : "单"; 
        this.typeText.string = dx  + "/" + ds;
    }
});
