cc.Class({
    extends: cc.Component,

    properties: {
        betPanel:cc.Prefab,
        canvas:cc.Node,
        minusBtn : cc.Button,
        plusBtn : cc.Button,
        betInfo : cc.Label,
        multipleLabel : cc.Label,
        multipleNum : 1,
        betType : "SSQ",
        betNum: 0,
        price : 2
    },

    // use this for initialization
    onLoad: function () {
        this.addBetPanel();
        this.setBetNumInfo();
        this.minusBtn.node.on(cc.Node.EventType.TOUCH_START, this.onBetMinus,this);
        this.plusBtn.node.on(cc.Node.EventType.TOUCH_START, this.onBetPlush,this); 
       
    },

    
     
     //添加提示弹窗
    addBetPanel: function () {
        var tip = cc.instantiate(this.betPanel);
        this.panelModule = tip.getComponent('BetPanel');
        this.canvas.addChild(tip);
    },


    //弹出提示
    betPanelShow: function (data) {
        this.panelModule.init(data)
        this.panelModule.show();
    },

    
    //增加倍数
   onBetPlush: function(event){
        if(this.multipleNum >= 99 ){
            return 
        }else{
            this.multipleNum  ++;
            this.multipleLabel.string = this.multipleNum +"倍"
          
        }
         this.setBetNumInfo();
   },
   
   //减少倍数
   onBetMinus: function(event){
        if(this.multipleNum  <= 1 ){
            return 
        }else{
            this.multipleNum  --;
            this.multipleLabel.string = this.multipleNum +"倍"
            this.setBetNumInfo();
        }
   },
   
  setBetNumInfo:function () {
       this.betInfo.string = this.multipleNum +"倍" + this.betNum+"注" + "共" + (this.multipleNum *this.betNum*this.price) +  "元";
  },
   //投注逻辑处理
   onBet: function(betVo){
        console.log("betData:" + betVo.infos);
        console.log("betVo:" + betVo);
        this.betPanelShow(betVo);
   }
});