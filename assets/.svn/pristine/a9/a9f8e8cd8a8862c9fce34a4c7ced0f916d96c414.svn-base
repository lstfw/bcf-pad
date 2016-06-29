cc.Class({
    extends: cc.Component,
    properties: {
         bg: cc.Sprite,
         num1Sprite:cc.Sprite,
         num2Sprite:cc.Sprite,
         isSelect:Boolean,
         strNum:String,
         type:String,
         dtype:String,
         ylLabel:cc.Label
    },
    //num： 号码
    //type: 球的类型   redBall   blueBall；
    //dtype : 用于标识球的 类型 （ 同一种球  用该字段来区分；
    init: function (num,type,dtype,ylText) {
       this.isSelect = false;
       this.strNum = num;
       this.type = type;
       this.dtype = dtype;
        if(ylText < 20){
            var color = new cc.Color(253, 217, 248);
             this.ylLabel.node.color = color;
        }
        this.ylLabel.string = ylText;
       this.setNum(num,false);
    },
    
     setBg:function(isSelect){
         var url  = ""
        if(isSelect){
            if(this.type == "redBall"){
                url = "resources/common/redBall.png";
            }else if(this.type == "blueBall"){
                url = "resources/common/blueBall.png";
            }
        }else{
            url = "resources/common/whiteBall.png";
        }
        var logoSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)));
        this.bg.getComponent(cc.Sprite).spriteFrame = logoSF;
    },
    
     setNum:function(num,isSelect){
         var type ="";
         if(this.type == "redBall"){
              type  = ( isSelect == true) ? "num_white_":"num_red_"; 
         }else if(this.type == "blueBall"){
              type  = ( isSelect == true) ? "num_white_":"num_blue_"; 

         }
       
        var num1 = "resources/numbers/"+type+num.charAt(0)+".png"
        var num2 = "resources/numbers/"+type+num.charAt(1)+".png"
         
        var n1 = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(num1)));
        this.num1Sprite.getComponent(cc.Sprite).spriteFrame = n1;
        
        var n2 = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(num2)));
        this.num2Sprite.getComponent(cc.Sprite).spriteFrame = n2;
    },
    
    setSelect:function (is_select) {
        this.isSelect = is_select;
        this.setBg(this.isSelect);
        this.setNum(this.strNum,this.isSelect);
    },
    
});
