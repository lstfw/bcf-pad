cc.Class({
    extends: cc.Component,

    properties: {
        issueLabel:cc.Label,
        ballNum1:cc.Label,
        ballNum2:cc.Label,
        ballNum3:cc.Label,
        ballNum4:cc.Label,
        ballNum5:cc.Label,
        ballNum6:cc.Label,
        ballNum7:cc.Label,
        ballNum8:cc.Label
    },

    // use this for initialization
    onLoad: function () {

    },

   init: function (data) {
      this.issueLabel.string = data.issue;
      this.ballNum1.string = data.ball[0];
      this.ballNum2.string = data.ball[1];
      this.ballNum3.string = data.ball[2];
      this.ballNum4.string = data.ball[3];
      this.ballNum5.string = data.ball[4];
      this.ballNum6.string = data.ball[5];
      this.ballNum7.string = data.ball[6];
      if(this.ballNum8){
          this.ballNum8.string = data.ball[7];
      }
    },
});
