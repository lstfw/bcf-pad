var dataConfig =require('DataConfig'); 
var Utils = require('Utils');
cc.Class({
    extends: cc.Component,

    properties: {
        ballContent:cc.Node,
        KJXXContent:cc.Node,
        tipsPrefab:cc.Prefab,
        bet:cc.Node,
        betVo:cc.Node,
        betBtn: cc.Button,
        selectBallClearBtn:cc.Button,
        dmBallClearBtn:cc.Button,
        tmBallClearBtn:cc.Button,
        typeContent:cc.Node,
        typeContent_1:cc.Node,
        typeContent_2:cc.Node,
        dmContent:cc.Node,
        tmContent:cc.Node,
        itemPrefab: cc.Prefab,
        kjxxPrefab: cc.Prefab,
        choiceItem: cc.Prefab,
        ballList:[],
        dmBallList:[],
        tmBallList:[],
        ballData:[],
        dmBallData:[],
        tmBallData:[],
        typeItems:[],
        betNum:0,
        currentType:1,
        tipsClss:Object,        
    },

    // use this for initialization
    onLoad: function () {
        
        //普通投注
        for (var i = 0; i < 30; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.x = -565 + 85 * parseInt(i%11);
            item.y = 160  - 85 * parseInt(i/11);;
            var num = ""+(i+1)+"";
            if(num<10){
                num = "0"+(i+1);
            }
            var ylNum = (i+10);
            item.getComponent('BallItem').init(num,"redBall","PT",ylNum);
            this.ballContent.addChild(item);
            this.ballList.push(item);
        }
        
        //胆码区域
        
        for (var index = 0; index < 30; index++) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.x = -565 + 85 * parseInt(index % 11);
            item.y = 205  - 85 * parseInt(index / 11);;
            var num = ""+(index + 1)+"";
            if(num<10){
                num = "0"+(index + 1);
            }
            var ylNum = (index+10);
            item.getComponent('BallItem').init(num,"redBall","DM",ylNum);
            this.dmContent.addChild(item);
            this.dmBallList.push(item);
            
        }
        
        //拖码区
         for (var index = 0; index < 30; index++) {
            var item = cc.instantiate(this.itemPrefab);
            this.addEventBtn(item);
            item.x = -565 + 85 * parseInt(index % 11);
            item.y = -120 -85 * parseInt(index / 11);;
            var num = ""+(index + 1)+"";
            if(num<10){
                num = "0"+(index + 1);
            }
            var ylNum = (index+10);
            item.getComponent('BallItem').init(num,"redBall","TM",ylNum);
            this.tmContent.addChild(item);
            this.tmBallList.push(item);
            
        }
           
        //添加开奖信息
        var data = dataConfig.kjData_7LC;
        for (var index = 0; index < data.length; index++) {
            var item = cc.instantiate(this.kjxxPrefab);
            item.y = -80*index;
            item.getComponent('SSQKJXXItem').init(data[index]);
            this.KJXXContent.addChild(item);
        }
        
        
        //初始化玩法选择
        var choiceData = dataConfig.choiceData_7LC;
        this.typeItems = [];
        for (var i = 0; i < 2; ++i) {
            var item = cc.instantiate(this.choiceItem);
            this.choiceItemAddEventBtn(item);
            var itemsClass =  item.getComponent('typeChoiceItem');
            itemsClass.init(choiceData[i]);
            itemsClass.setSelect( ( i== 0 ) ? true : false);
            this.typeItems.push(item);
            this.typeContent.addChild(item);
        }
        
           var item = cc.instantiate(this.tipsPrefab);
           this.node.addChild(item);
           this.tipsClss = item.getComponent('Tips');
           
          this.typeContent_1.opacity = 255;
          this.typeContent_1.active = true;
          this.typeContent_2.opacity = 0;
          this.typeContent_2.active = false;
          this.betBtn.node.on(cc.Node.EventType.TOUCH_START,this.betBtnFun,this);
          this.selectBallClearBtn.node.on(cc.Node.EventType.TOUCH_START,this.selectBallClearBtnFun,this);
          this.dmBallClearBtn.node.on(cc.Node.EventType.TOUCH_START,this.selectBallClearBtnFun,this);
          this.tmBallClearBtn.node.on(cc.Node.EventType.TOUCH_START,this.selectBallClearBtnFun,this);
    },

    //添加 玩法选择点击
    choiceItemAddEventBtn: function (item) {
        var self = this
        item.on('touchend', function (event) {
            var choiceItem = event.target.getComponent('typeChoiceItem');
            self.clearBorder();
            choiceItem.setSelect(!choiceItem.isSelect);
            self.route(choiceItem);
        }, this);
    },
    
    //去除玩法选中
    clearBorder: function () {
        for (var i = 0; i < this.typeItems.length; i++) {
            this.typeItems[i].getComponent('typeChoiceItem').setSelect(false);
        }
    },
    
    //玩法界面切换
    route: function (choiceItem) {
        if (choiceItem.id === 1) {
          this.currentType = 1;
          this.typeContent_1.opacity = 255;
          this.typeContent_1.active = true;
          this.typeContent_2.opacity = 0;
          this.typeContent_2.active = false;
        } else if (choiceItem.id === 2) {
          this.typeContent_2.opacity = 255;
          this.typeContent_2.active = true;
          this.typeContent_1.opacity = 0;
          this.typeContent_1.active = false;
          this.currentType = 2;
          
        } 
    },
    
    //给号码添加点击事件
    addEventBtn:function(item){
        item.on('touchstart', function (event) {
           var item = event.target.getComponent('BallItem');
           this.barItemClickFun(item,!item.isSelect);
        }, this);
    },
    
    //清除选中的 号码
    selectBallClearBtnFun:function (event) {
        cc.log(" event button name : " + event.target.name);
        var btnName = event.target.name;
        var arr = (btnName == "selectBallClearBtn" ) ? this.ballList : (btnName == "dmSelectBallClearBtn") ? this.dmBallList : this.tmBallList;
        for (var index = 0; index < arr.length; index++) {
             var item = arr[index].getComponent('BallItem');
            if(item.isSelect){
                this.barItemClickFun(item,false);
            }
        }   
    },
     //处理号码点击
    barItemClickFun:function (item,isSelect) {
         //胆码最多选择六个
        if(item.dtype == "DM" && isSelect && this.dmBallData.length >= 6){
            cc.log("胆码最多选择六个");
          this.tipsClss.show("胆码最多选择六个");
            return;
        }
        
         item.setSelect(isSelect);
        var arrr = (item.dtype == "PT") ? this.ballData :(item.dtype == "DM")? this.dmBallData: this.tmBallData;
        if(item.isSelect){
            if(arrr.indexOf(item.strNum)==-1) {
                arrr.push(item.strNum);
            }
        }else{
            if(arrr.indexOf(item.strNum)!=-1) {
                arrr.splice(arrr.indexOf(item.strNum),1);
            }
        }
        //点击胆码 判断该号码 是否已经 存在 拖码区中
        if(item.dtype == "DM" && item.isSelect){
            if(this.tmBallData.indexOf(item.strNum)!=-1){//存在拖码中
                this.tmBallData.splice(this.tmBallData.indexOf(item.strNum),1); //剔除拖码中的该号码；
                var itemBall = this.getBall("TM",item.strNum);
                if(itemBall){
                   itemBall.setSelect(false); 
                }
            }
        }else if (item.dtype == "TM" && item.isSelect){ //点击拖码 判断该号码 是否已经 存在 胆码区中
             if(this.dmBallData.indexOf(item.strNum)!=-1){//存在 胆码中
                this.dmBallData.splice(this.dmBallData.indexOf(item.strNum),1); //剔除 胆码 中的该号码；
                var itemBall = this.getBall("DM",item.strNum);
                if(itemBall){
                   itemBall.setSelect(false); 
                }
            }
        }
       
        
       this.getBetNumber();
    },
    
    getBall:function (type,nums) {
        var array  =  (type == "PT") ? this.ballList :(type == "DM") ? this.dmBallList: this.tmBallList;
        for (var index = 0; index < array.length; index++) {
            var element = array[index].getComponent('BallItem');
            if(element.strNum == nums){
                return element;
            }
        }
        return null;
    },
    
    //计算注数
    getBetNumber:function () {
        if(this.currentType == 1){
            this.betNum = Utils.numberOfPermutation(this.ballData.length,7); 
        }else if (this.currentType == 2){
           //  this.betNum = Utils.numberOfPermutation(this.ballData.length,7); 
           if(this.dmBallData.length == 0){
                this.betNum = 0;
           }else{
                this.betNum = Utils.numberOfPermutation(this.tmBallData.length,7-this.dmBallData.length);     
           }
        }
        var bet = this.bet.getComponent("Bet");
        bet.betType = "7LC";
        bet.betNum =  this.betNum;
        bet.setBetNumInfo();
    },
    
    //投注
    betBtnFun:function(event) {
 
        if( this.betNum*2 > 20000){//单次投注金额不得超过2万
           this.tipsClss.show("单次投注金额不得超过2万");
            return;
        }
        
         if( this.betNum < 1 ){
            this.tipsClss.show("至少选择一注！");
            return ;
        }
       
         var betVo = this.betVo.getComponent("BetVo"); 
        if(this.currentType == 1){//普通投注
           if(this.ballData.length > 12 ){
              this.tipsClss.show("最多可选12个号码！");
            
            return;
          } 
          if(this.ballData.length == 7 ){
                betVo.itemRuleType = "单式";
                betVo.betType ="Regular";
                betVo.method = "Manual";
            }else{
                betVo.itemRuleType = "复式";
                betVo.betType = ( this.ballData.length == 7)? "Regular":"Sys"+ this.ballData.length;
                betVo.method = "Manual";
            }
            betVo.infos  = this.ballData.join(",");
            var obj = {};
            obj.ball = this.ballData.join("  ");
            betVo.itemLabel = obj;
        } else if(this.currentType == 2){//胆拖投注
            if(this.dmBallData.length > 6 ){
                 cc.log("胆码最多选择六个");
                  this.tipsClss.show("胆码最多选择六个");
                 return;
            } else if (this.tmBallData .length < 2 ){
                  cc.log("至少选择6个拖码");
                   this.tipsClss.show("至少选择6个拖码");
                  return;
            }
            betVo.itemRuleType = "胆拖";
            betVo.betType ="Banker"+this.tmBallData.length;
            betVo.method = "Manual";
            betVo.infos  = this.dmBallData.join(",") + "#" + this.tmBallData.join(",") ;
            var obj = {};
            obj.dm = this.dmBallData.join("  ");
            obj.tm = this.tmBallData.join("  ");
            betVo.itemLabel = obj;
        }
        betVo.betNum =  this.betNum;
        var bet = this.bet.getComponent("Bet");
        bet.onBet(betVo);
    }
});
