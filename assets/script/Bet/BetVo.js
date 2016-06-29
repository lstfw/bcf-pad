cc.Class({
    extends: cc.Component,
    properties: {
        itemRuleType: "",//彩种玩法类别文字 界面显示
        itemLabel: Object,//投注内容文字 界面显示
        betType: "", //投注类型代码(单式 复式)
        method: "",//选号方式 (机选   手选)；
        infos: "",//投注内容
        betNum:"" //倍数
    },
    onLoad: function () {

    },
});
