var GXK3Ver  = require("GXK3Ver");
var Utils = require('Utils');
cc.Class({
    extends: cc.Component,

    properties: {
      KJXXContent: cc.Node,
      WFXZConent: cc.Node,
      type1View:cc.Node,
      type2View:cc.Node,
      type3View:cc.Node,
      type4View:cc.Node,
      type5View:cc.Node,
      type6View:cc.Node,
      type7View:cc.Node,
      type8View:cc.Node,
      betVo:cc.Node,
      betBtn:cc.Button,
      bet:cc.Node,
      KJItem:cc.Prefab,
      choiceItem:cc.Prefab,
      longBtnItem: cc.Prefab,
      middleButton:cc.Prefab,
      longLongButton: cc.Prefab,
      smallButton:cc.Prefab,
      tipsPrefab:cc.Prefab,
      tipsClss:Object,  
      currentType:0,
      typeItems:[],
      longBtnItems:[],
      numBtnPrefabItems:[],
      numBtnPrefabItems2:[],
      selectData:[],
      selectBTHData:[],
      selectTHData:[],
      pick:[],
      betNum: 0
    },

 
    onLoad: function () {
        
       //添加开奖信息
       var data  = GXK3Ver.KJinfo;
        for (var i = 0; i < data.length; ++i) {
            var item = cc.instantiate(this.KJItem);
            item.getComponent('KJItem').init(data[i]);
            item.x = 25;
            item.y = -45*i;
            this.KJXXContent.addChild(item);
        }

        //添加玩法选择
        var choiceData = GXK3Ver.typData;
        this.typeItems = [];
        for (var i = 0; i < choiceData.length; ++i) {
            var item = cc.instantiate(this.choiceItem);
            this.choiceItemAddEventBtn(item,"typeChoiceItem");
            var itemsClass =  item.getComponent('typeChoiceItem');
            itemsClass.init(choiceData[i]);
            itemsClass.setSelect( ( i== 0 ) ? true : false);
            this.typeItems.push(item);
            this.WFXZConent.addChild(item);
        }

        var item = cc.instantiate(this.tipsPrefab);
        this.node.addChild(item);
        this.tipsClss = item.getComponent('Tips');

        this.pick.push(this.type1View);
        this.pick.push(this.type2View);
        this.pick.push(this.type3View);
        this.pick.push(this.type4View);
        this.pick.push(this.type5View);
        this.pick.push(this.type6View);
        this.pick.push(this.type7View);
        this.pick.push(this.type8View);
        
        this.betBtn.node.on(cc.Node.EventType.TOUCH_START,this.betBtnFun,this);
        this.route("typeChoiceItem",null);
    },
    
    initType1View: function () {
        var data = GXK3Ver.longBtnData;
        this.longBtnItems = [];
        var selectBtnLayout = cc.find('Canvas/anchor-center-center/Type1ViewContent/selectBtnLayout');
       selectBtnLayout.removeAllChildren();
        for (var i = 0; i < data.length; ++i) {
            var item = cc.instantiate(this.longBtnItem);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(data[i],"long_btn");
            itemsClass.setSelect(false);
            this.longBtnItems.push(item);
           selectBtnLayout.addChild(item);
        }

        var content = cc.find('Canvas/anchor-center-center/Type1ViewContent/typeViewLayout');
        var hzData = GXK3Ver.hzData;
        this.numBtnPrefabItems =[];
        content.removeAllChildren();
        for (var index = 0; index < 16; index++) {
            var item = cc.instantiate(this.middleButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(hzData[index],"middle_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems.push(item);
        }
    },

    initType2View: function () {
        var data = GXK3Ver.sthTxData;
        var selectBtnLayout = cc.find('Canvas/anchor-center-center/Type2ViewContent/type2ViewLayout');
        this.numBtnPrefabItems =[];
        selectBtnLayout.removeAllChildren();
        var item = cc.instantiate(this.longLongButton);
        this.choiceItemAddEventBtn(item,"SpriteBtn");
        var itemsClass =  item.getComponent('SpriteBtn');
        itemsClass.init(data,"long_long_btn");
        itemsClass.setSelect(false);
        selectBtnLayout.addChild(item);
        this.numBtnPrefabItems.push(item);
    },

    initType3View: function () {
        var sthDxData = GXK3Ver.sthDxData;
        var content = cc.find('Canvas/anchor-center-center/Type3ViewContent/type3ViewLayout');
        this.numBtnPrefabItems =[];
        content.removeAllChildren();
        for (var index = 0; index < sthDxData.length; index++) {
            var item = cc.instantiate(this.middleButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(sthDxData[index],"middle_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems.push(item);
        }
    },

    initType4View: function () {
        var sbthData = GXK3Ver.sbthData;
        var content = cc.find('Canvas/anchor-center-center/Type4ViewContent/type4ViewLayout');
        this.numBtnPrefabItems =[];
        content.removeAllChildren();
        for (var index = 0; index < sbthData.length; index++) {
            var item = cc.instantiate(this.smallButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(sbthData[index],"small_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems.push(item);
        }
    },

    initType5View: function () {
        var data = GXK3Ver.slhTxData;
        var selectBtnLayout = cc.find('Canvas/anchor-center-center/Type5ViewContent/type5ViewLayout');
        this.numBtnPrefabItems =[];
        selectBtnLayout.removeAllChildren();
        var item = cc.instantiate(this.longLongButton);
        this.choiceItemAddEventBtn(item,"SpriteBtn");
        var itemsClass =  item.getComponent('SpriteBtn');
        itemsClass.init(data,"long_long_btn");
        itemsClass.setSelect(false);
        selectBtnLayout.addChild(item);
        this.numBtnPrefabItems.push(item);
    },

      initType6View: function () {
        var ethFxData = GXK3Ver.ethFxData;
        var content = cc.find('Canvas/anchor-center-center/Type6ViewContent/type6ViewLayout');
        this.numBtnPrefabItems =[];
        content.removeAllChildren();
        for (var index = 0; index < ethFxData.length; index++) {
            var item = cc.instantiate(this.middleButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(ethFxData[index],"middle_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems.push(item);
        }

        var ethFxData = GXK3Ver.ethDxData;
        var content = cc.find('Canvas/anchor-center-center/Type6ViewContent/type61ViewLayout');
        this.numBtnPrefabItems2 =[];
        content.removeAllChildren();
        for (var index = 0; index < ethFxData.length; index++) {
            var item = cc.instantiate(this.middleButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(ethFxData[index],"middle_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems2.push(item);
        }

    },

    initType7View: function () {
        var ethFxData = GXK3Ver.ethFxData;
        var content = cc.find('Canvas/anchor-center-center/Type7ViewContent/type7ViewLayout');
        this.numBtnPrefabItems =[];
        content.removeAllChildren();
        for (var index = 0; index < ethFxData.length; index++) {
            var item = cc.instantiate(this.middleButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(ethFxData[index],"middle_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems.push(item);
        }
    },

    initType8View: function () {
        var sbthData = GXK3Ver.sbthData;
        var content = cc.find('Canvas/anchor-center-center/Type8ViewContent/type8ViewLayout');
        this.numBtnPrefabItems =[];
        content.removeAllChildren();
        for (var index = 0; index < sbthData.length; index++) {
            var item = cc.instantiate(this.smallButton);
            this.choiceItemAddEventBtn(item,"SpriteBtn");
            var itemsClass =  item.getComponent('SpriteBtn');
            itemsClass.init(sbthData[index],"small_btn");
            itemsClass.setSelect(false);
            content.addChild(item);
            this.numBtnPrefabItems.push(item);
        }
    },

     //添加 玩法选择点击
    choiceItemAddEventBtn: function (item,componentName) {
        var self = this;
        item.on('touchend', function (event) {
            var item = event.target.getComponent(componentName);
           if(componentName == "typeChoiceItem" || item.type == "long_btn"){
            if(item.isSelect) return;
            self.clearBorder(componentName,item);
            item.setSelect(!item.isSelect);
           }
            self.route(componentName,item);
        }, this);
    },

 //去除玩法选中
    clearBorder: function (componentName,item) {
         var arr = [];
        if(componentName == "typeChoiceItem" ) {
            arr = this.typeItems;
        }else if (item.type == "long_btn"){
            arr = this.longBtnItems;
        }else if (item.type == "middle_btn" && this.currentType == 1){//和值
            arr = this.numBtnPrefabItems;
        }
          
        for (var i = 0; i < arr.length; i++) {
            arr[i].getComponent(componentName).setSelect(false);
        }
    },

    //大小单双筛选
    btnFilter:function (type) {
        //特殊处理 二同号单选
          var arr = this.numBtnPrefabItems;
          var arr2 = this.selectData;
        if(this.currentType == 6 ){
            if(type.length == 1){
                arr = this.numBtnPrefabItems2;
                arr2 =  this.selectBTHData;
            }else{
                arr = this.numBtnPrefabItems; 
                arr2 =  this.selectTHData;
            }
        }
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            var itemsClass =  element.getComponent('SpriteBtn');
             if(type == 101){//大 
                 if(itemsClass.data.id > 10){
                    arr2.push(itemsClass.data.id);
                    itemsClass.setSelect(true);
                 }else{
                    itemsClass.setSelect(false);
                 }
             }else if (type == 102){//小
                if(itemsClass.data.id < 11){
                   arr2.push(itemsClass.data.id);
                    itemsClass.setSelect(true);
                }else{
                   itemsClass.setSelect(false); 
                }
             }else if(type == 103){//单
                if( parseInt(itemsClass.data.id) %2  != 0){
                    arr2.push(itemsClass.data.id);
                    itemsClass.setSelect(true);
                }else{
                    itemsClass.setSelect(false);  
                }
             }else if(type == 104){//双
                 if(parseInt(itemsClass.data.id) %2  == 0){
                     arr2.push(itemsClass.data.id);
                     itemsClass.setSelect(true);
                 }else{
                    itemsClass.setSelect(false);
                 }
             }else{
                if(itemsClass.data.id == type) {
                    if(arr2.indexOf(itemsClass.data.id)!=-1) {
                        arr2.splice(arr2.indexOf(itemsClass.data.id),1);
                    }else{
                        arr2.push(itemsClass.data.id);
                    }
                    itemsClass.setSelect(!itemsClass.isSelect);
                }
             }
        }
        
        if(this.currentType == 6){
            if(type.length == 1){//不同号 是否在 同号码选中数组里
                 for (var index = 0; index < this.selectBTHData.length; index++) {
                    var data = this.selectBTHData[index];
                    var tempData = data+data;
                    if(this.selectTHData.indexOf(tempData)!=-1){
                        var itemsClass =  this.numBtnPrefabItems[index].getComponent('SpriteBtn');
                        itemsClass.setSelect(false);
                        this.selectTHData.splice(this.selectTHData.indexOf(tempData),1);
                    }
                }
            }else{
                for (var index = 0; index < this.selectTHData.length; index++) {
                    var data = this.selectTHData[index];
                    if(this.selectBTHData.indexOf(data.charAt(0))!=-1){
                        var itemsClass =  this.numBtnPrefabItems2[index].getComponent('SpriteBtn');
                        itemsClass.setSelect(false);
                        this.selectBTHData.splice(this.selectBTHData.indexOf(data.charAt(0)),1);
                    }
                }
            }
        }
        this.getBetNumber();
    },

     //计算注数
    getBetNumber:function () {
        if(this.currentType == 1 || this.currentType == 2 || this.currentType == 3 || this.currentType == 5 || this.currentType == 7){
            this.betNum = this.selectData.length; 
        }else if(this.currentType == 4){
           this.betNum = Utils.numberOfPermutation(this.selectData.length,3);
        }else if(this.currentType == 8){
           this.betNum = Utils.numberOfPermutation(this.selectData.length,2);
        }else if(this.currentType == 6){
           this.betNum = this.selectTHData.length * this.selectBTHData.length; 
        }
        var bet = this.bet.getComponent("Bet");
        bet.betType = "GXK3";
        bet.betNum =  this.betNum;
        bet.setBetNumInfo();
    },

    
    //玩法界面切换
    route: function (componentName,item) {
        if(componentName === "typeChoiceItem"){
            this.selectData = [];
            this.selectTHData = [];
            this.selectBTHData = [];
            this.currentType = item ? item.id : 1;
            this.getBetNumber();
            this["initType"+this.currentType+"View"]();
            this.packShow(this.currentType-1);
            
        }else  if (componentName === "SpriteBtn"){
            if(!item) return;
            if(item.type == 101 || item.type == 102 || item.type == 103 || item.type == 104)  {
                this.selectData = [];
            }
             this.btnFilter(item.data.id);

        }
    },
      //显示不同界面
    packShow: function (n) {
        for (var i = 0; i < this.pick.length; i++) {
            if (i != n) {
                this.pick[i].opacity = 0;
                this.pick[i].active = false;
            } else {
                this.pick[i].opacity = 255;
                this.pick[i].active = true;
            }
        }
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
        if(this.currentType == 1){//和值投注
            betVo.itemRuleType = "和值";
            betVo.betType ="01";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = this.selectData.join("  ");
            betVo.itemLabel = obj;
        }else if(this.currentType == 2){
            betVo.itemRuleType = "三同号通选";
            betVo.betType ="02";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = "三同号通选";
            betVo.itemLabel = obj;
        }else if(this.currentType == 3){
            betVo.itemRuleType = "三同号单选";
            betVo.betType ="03";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = this.selectData.join("  ");
            betVo.itemLabel = obj;
        }else if (this.currentType == 4){
            betVo.itemRuleType = "三不同号";
            betVo.betType ="04";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = this.selectData.join("");
            betVo.itemLabel = obj;
        }else if (this.currentType == 5){
            betVo.itemRuleType = "三连号通选";
            betVo.betType ="05";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = "三连号通选";
            betVo.itemLabel = obj;
        }else if (this.currentType == 6){
            betVo.itemRuleType = "二同号单选";
            betVo.betType ="06";
            betVo.method = "Manual";
            betVo.infos  = this.selectTHData.join(",")+"|"+this.selectBTHData.join(",");
            var obj = {};
            obj.ball = this.selectTHData.join(",")+"|"+this.selectBTHData.join(",");
           
            betVo.itemLabel = obj;
        }else if (this.currentType == 7){
            betVo.itemRuleType = "二同号复选";
            betVo.betType ="07";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = "二同号复选";
            betVo.itemLabel = obj;
        }else if (this.currentType == 8){
            betVo.itemRuleType = "二不同号";
            betVo.betType ="08";
            betVo.method = "Manual";
            betVo.infos  = this.selectData.join(",");
            var obj = {};
            obj.ball = this.selectData.join(" ");
            betVo.itemLabel = obj;
        }
        var bet = this.bet.getComponent("Bet");
        bet.onBet(betVo);
    }
});
