var Utils = require('Utils');
var dataConfig = require('DataConfig');


cc.Class({
    extends: cc.Component,

    properties: {
        qh: cc.Label,
        date: cc.Label
    },

    onLoad: function () {
        var data = dataConfig.seedSData[dataConfig.seedType - 1]
        this.qh.string = '期号：' + data.issue;
        this.setTime(data.betTimes);
        this.schedule(function () {
            this.setTime(data.betTimes);
        }, 0.5);
    },


    //设置时间
    setTime: function (endTime) {
        var leftTime = Utils.formatTimes(endTime, 2);
        if (leftTime === 0) {
            this.date.getComponent(cc.Label).string = '开奖结束';
        } else {
            this.date.getComponent(cc.Label).string = '投注截止时间：' + leftTime;
        }
    }







    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
