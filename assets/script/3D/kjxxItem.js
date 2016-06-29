cc.Class({
    extends: cc.Component,

    properties: {
        stageText:cc.Label,
        typeText:cc.Label,
        ball1:cc.Label,
        ball2:cc.Label,
        ball3:cc.Label
    },

    init:function(data){
        this.stageText.string = data.stage;
        this.typeText.string = data.type;
        this.ball1.string = data.balls[0];
        this.ball2.string = data.balls[1];
        this.ball3.string = data.balls[2];
    }
});
