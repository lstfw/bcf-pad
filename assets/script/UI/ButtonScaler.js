cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 0.9,
        transDuration: 0.2,
        buttonAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown (event) {
            this.stopAllActions();
            self.playButton();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp (event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    },
    _playSFX: function(clip) {
        cc.audioEngine.playEffect( clip, false );
    },

    playButton: function() {
        this._playSFX(this.buttonAudio);
    }
});
