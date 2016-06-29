var Utils = require('Utils');
var dataConfig =require('DataConfig'); 
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        kjxxPrefab: cc.Prefab,
        redBallClearBtn: cc.Button,
        blueBallClearBtn: cc.Button,
        randomRedBallBtn: cc.Button,
        randomBlueBallBtn: cc.Button,
        blueBallSelectAllBtn: cc.Button,
        betBtn: cc.Button,
        redBallList: [],
        blueBallList: [],
        redBallData: [],
        blueBallData: [],
        betNum:0,
        bet:cc.Node,
        betVo:cc.Node
    },
    onLoad: function () {
        
        //生成红球
        for (var i = 0; i < 33; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.x = -405 + 85 * parseInt(i%11);
            item.y = 80  - 75 * parseInt(i/11);;
            var num = ""+(i+1)+"";
            if(num<10){
                num = "0"+(i+1);
            }
            var ylNum = (i+10);
            item.getComponent('BallItem').init(num,"redBall","redBall",ylNum);
            this.node.getChildByName("RedBallContent").addChild(item);
            this.redBallList.push(item);
        }
        
        //生成蓝球
        for (var index = 0; index < 16; index++) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.x = -405 + 85 * parseInt(index%11);
            item.y = 43 - 75 * parseInt(index/11);;
            var num = ""+(index+1)+"";
            if(num<10){
                num = "0"+(index+1);
            }
            var ylNum = (index+10);
            item.getComponent('BallItem').init(num,"blueBall","blueBall",ylNum);
            this.node.getChildByName("BlueBallContent").addChild(item);
            this.blueBallList.push(item);
        }
        
        //添加开奖信息
        var data = dataConfig.kjData_ssq;
        for (var index = 0; index < data.length; index++) {
            var item = cc.instantiate(this.kjxxPrefab);
            item.y = -90*index;
            item.getComponent('SSQKJXXItem').init(data[index]);
            this.node.getChildByName("KJXXContent").addChild(item);
        }
        
         //添加按钮监听
        this.redBallClearBtn.node.on(cc.Node.EventType.TOUCH_START, this.ballClearBtnFun,this);
        this.blueBallClearBtn.node.on(cc.Node.EventType.TOUCH_START, this.ballClearBtnFun,this);
        this.randomRedBallBtn.node.on(cc.Node.EventType.TOUCH_START, this.randomBallFun,this);
        this.randomBlueBallBtn.node.on(cc.Node.EventType.TOUCH_START, this.randomBallFun,this);
        this.blueBallSelectAllBtn.node.on(cc.Node.EventType.TOUCH_START,this.blueBallSelectAllBtnFun,this);
        this.betBtn.node.on(cc.Node.EventType.TOUCH_START,this.betBtnFun,this);
    },
    
    addEventBtn:function(item){
        item.on('touchstart', function (event) {
           var item = event.target.getComponent('BallItem');
           this.barItemClickFun(item,!item.isSelect);
        }, this);
    },
    
    barItemClickFun:function (item,isSelect) {
         item.setSelect(isSelect);
        var arrr = (item.dtype == "redBall") ? this.redBallData : this.blueBallData;
        if(item.isSelect){
            if(arrr.indexOf(item.strNum)==-1) {
                arrr.push(item.strNum);
            }
        }else{
            if(arrr.indexOf(item.strNum)!=-1) {
                arrr.splice(arrr.indexOf(item.strNum),1);
            }
        }
        
        this.getBetNumber();
       
    },
    
    ballClearBtnFun:function (event) {
         
        this.clearBtnFun(event.target.name);
    },
    
    randomBallFun:function (event) {
     
      var eventName = event.target.name;
      var arrr = [];
      var counts = 6;
      var clearBtnName  = "";
      if (eventName == "RandomRedBallBtn" ) {
          arrr = this.redBallList;
          clearBtnName = "redBallClearBtn";
      }else{
          arrr = this.blueBallList;
           clearBtnName = "blueBallClearBtn";
      }
      this.clearBtnFun(clearBtnName);
      var arr =  Utils.getRandomValueForArray(arrr,counts);
      for (var index = 0; index < arr.length; index++) {
         var item = arr[index].getComponent('BallItem');
            this.barItemClickFun(item,true);
      }
    },
    
    clearBtnFun:function (tName) {
     var arrr = [];
        if ( tName == "redBallClearBtn" ) {
            arrr = this.redBallList;
        }else{
            arrr = this.blueBallList;
        }
        for (var index = 0; index < arrr.length; index++) {
             var item = arrr[index].getComponent('BallItem');
            if(item.isSelect){
                this.barItemClickFun(item,false);
            }
        }   
    },
    
    blueBallSelectAllBtnFun:function (event) {
        for (var index = 0; index < this.blueBallList.length; index++) {
            var item = this.blueBallList[index].getComponent('BallItem');
            item.setSelect(true);
            this.barItemClickFun(item,true);
        }   
    },
    
    getBetNumber:function () {
        this.betNum = Utils.numberOfPermutation(this.redBallData.length,6) * this.blueBallData.length;
        var bet = this.bet.getComponent("Bet");
        bet.betType = "SSQ";
        bet.betNum =  this.betNum;
        bet.setBetNumInfo();
    },
    
    betBtnFun:function(event) {
     
        if( this.betNum*2 > 20000){//单次投注金额不得超过2万
           cc.log("单次投注金额不得超过2万");
            return;
        }
        if(this.redBallData.length > 20 ){
             cc.log.show("最多可选20个红球！");
            return;
        }
        if( this.betNum < 1 ){
            cc.log("至少选择一注！");
            return ;
        }
      
        var betVo = this.betVo.getComponent("BetVo");
        if(this.redBallData.length == 6 && this.blueBallData.length == 1){
            betVo.itemRuleType = "单式";
            betVo.betType ="Regular";
            betVo.method = "Manual";
           
        }else{
            betVo.itemRuleType = "复式";
            betVo.betType = ( this.redBallData.length == 6)? "Regular":"Sys"+ this.redBallData.length;
            betVo.method = "Manual";
        }
        betVo.infos  = this.redBallData.join(",")+"#"+ this.blueBallData.join(",");
        var obj = {};
        obj.red = this.redBallData.join("  ");
        obj.blue = this.blueBallData.join("  ");
        betVo.itemLabel = obj;
        betVo.betNum =  this.betNum;
        var bet = this.bet.getComponent("Bet");
        bet.onBet(betVo);
    },
});
