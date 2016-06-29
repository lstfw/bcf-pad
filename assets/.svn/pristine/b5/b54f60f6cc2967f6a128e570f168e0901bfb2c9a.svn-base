cc.Class({
    extends: cc.Component,

    properties: {
        tip: cc.Node,
        duration: 0.3
    },


    init: function (home) {
        this.home = home;
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
