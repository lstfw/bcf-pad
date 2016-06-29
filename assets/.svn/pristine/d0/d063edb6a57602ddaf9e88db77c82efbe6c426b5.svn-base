cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration: 0.2,
    },

    moveTox: function (x) {
        //x轴移动
        var move = cc.moveTo(this.jumpDuration, cc.v2(x, -45)).easing(cc.easeCubicActionOut());
        // 不重复
        return cc.sequence(move);
    },
    moveToy: function (y) {
        var move = cc.moveTo(this.jumpDuration, cc.v2(67, y)).easing(cc.easeCubicActionIn());
        // 不重复
        return cc.sequence(move);
    },
    moveTo: function (x, y) {
        var move = cc.moveTo(this.jumpDuration, cc.v2(x, y)).easing(cc.easeCubicActionIn());
        // 不重复
        return cc.sequence(move);
    }


});
