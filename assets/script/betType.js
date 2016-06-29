cc.Class({
    extends: cc.Component,

    properties: {
        minusBtn: cc.Button,
        plusBtn: cc.Button,
        betInfo: cc.Label,
        multipleLabel: cc.Label,
        multipleNum: 1,
        betNum: 0,
        price: 2
    },

    // use this for initialization
    onLoad: function () {

        this.betInfo.string = this.multipleNum + "倍" + this.betNum + "注" + "共" + (this.multipleNum * this.betNum * this.price) + "元";
        this.minusBtn.node.on('touchend', this.onBetMinus, this);
        this.plusBtn.node.on('touchend', this.onBetPlush, this);

    },

    //增加倍数
    onBetPlush: function (event) {
        if (this.multipleNum >= 99) {
            return
        } else {
            this.multipleNum++;
            this.multipleLabel.string = this.multipleNum + "倍"
            this.betInfo.string = this.multipleNum + "倍" + this.betNum + "注" + "共" + (this.multipleNum * this.betNum * this.price) + "元";
        }
        this.setBetNumInfo();
    },

    //减少倍数
    onBetMinus: function (event) {
        if (this.multipleNum <= 1) {
            return
        } else {
            this.multipleNum--;
            this.multipleLabel.string = this.multipleNum + "倍"
            this.setBetNumInfo();
        }
    },
    //刷新注数
    setBetNumInfo: function () {
        this.betInfo.string = this.multipleNum + "倍" + this.betNum + "注" + "共" + (this.multipleNum * this.betNum * this.price) + "元";
    },
    //投注逻辑处理
    onBet: function (betVo) {
        cc.log("betData" + betVo.infos);
    },


});