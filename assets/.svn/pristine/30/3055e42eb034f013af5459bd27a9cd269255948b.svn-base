cc.Class({
    extends: cc.Component,

    properties: {
        stage: cc.Label,
        nubs: {
            default: [],
            type: cc.Label
        },
    },

    // use this for initialization
    init: function (data) {
        this.stage.string = '期次:' + data.stage;
        for (var i = 0; i < data.nuns.length; i++) {
            this.nubs[i].string = data.nuns[i];
        }

    },

});
