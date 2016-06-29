cc.Class({
    extends: cc.Component,

    properties: {
    },

    //返回主页
    enterMainScene:function() {
         cc.director.loadScene('main');
          cc.log("---------------------------enterMainScene");
    },
    //进入购彩大厅
    enterLotteryHallScene: function () {
       cc.director.loadScene('hall');
       cc.log("---------------------------enterLotteryHallScene");
       //this.gameOver();
    },
    
    //进入资讯
    enterNewsScene:function () {
         cc.log("---------------------------enterNewsScene");
        
    },
    
    //进入工具走势图
    enterToolsScene:function () {
        
        cc.log("---------------------------enterToolsScene");
    },
    
    //进入我的账户
    enterAccountScene:function () {
        
         cc.log("---------------------------enterAccountScene");
    }
    
   
});
