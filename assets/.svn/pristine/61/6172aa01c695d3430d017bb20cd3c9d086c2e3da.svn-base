cc.Class({
    extends: cc.Component,

    properties: {
        tip: cc.Node,
        tipText: cc.Label,
        close: cc.Node,
        sure: cc.Node,
        duration: 0.3
    },


    init: function (data, home) {
        this.home = home;
        this.tipText.string = data;
    },


    show: function () {
        this.tip.emit('fade-in');
        this.home.toggleHomeBtns(false);
    },

    hide: function () {
        this.tip.emit('fade-out');
        this.home.toggleHomeBtns(true);
    },

});
