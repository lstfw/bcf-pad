var dataConfig = require('DataConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        headPortrait: {
            default: null,
            type: cc.Sprite
        },
        userName: {
            default: null,
            type: cc.Label
        },
        amountText: {
            default: null,
            type: cc.Label
        },
        pointsText: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        var userData = dataConfig.userData;
        this.setUserInf(userData);
    },

    setUserInf: function (userData) {
        var headPortrait = userData.headPortrait,
            userName = userData.userName,
            amountText = userData.amountText + '元',
            pointsText = userData.pointsText + '分'

        if (headPortrait === undefined) {
            headPortrait = '';
        }
        var logoSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(headPortrait)), cc.Rect(0, 0, 0, 0));
        this.headPortrait.getComponent(cc.Sprite).spriteFrame = logoSF;
        this.userName.getComponent(cc.Label).string = userName;
        this.amountText.getComponent(cc.Label).string = amountText;
        this.pointsText.getComponent(cc.Label).string = pointsText;
    }






    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
