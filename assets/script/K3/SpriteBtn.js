cc.Class({
    extends: cc.Component,

    properties: {
      bg:cc.Sprite,
      leftText:cc.Sprite,
      leftText2:cc.Sprite,
      leftText3:cc.Sprite,
      rightText:cc.Label,
      missingNumLabel:cc.Label,
      data:Object,
      isSelect:Boolean,
      type: ""
      
      
    },

    onLoad: function () {

    },
    
    
    init: function (_data,_type) {
        if(_data == undefined) return ;
        this.data = _data;
        this.type = _type;
        if(this.rightText)this.rightText.string =  this.data.hasOwnProperty("rightText") ?  this.data.rightText : "";
    },
    
   setSelect:function (is_select) {
        this.isSelect = is_select;
        var url = "";
        var skin = "";
        var color ;
        if(this.isSelect){
           if(this.type == "long_long_btn"){
               skin =   this.data.downSkinName;
               url = 'resources/K3/long_long_btn_bg_down.png';
           }else if(this.type == "long_btn"){
                url = 'resources/K3/long_btn_bg_down.png';
                skin =   this.data.downSkinName;
            }else if (this.type == "middle_btn"){
                url = 'resources/K3/middle_btn_bg_down.png';
                skin = 'resources/numbers/num_kyellow_'+ this.data.id.charAt(0)+'.png';
                if(this.data.id.charAt(1)){
                    this.setImage('resources/numbers/num_kyellow_'+ this.data.id.charAt(1)+'.png',this.leftText2);
                }else{
                    this.leftText2.node.opacity = 0;
                    this.leftText2.node.active = false;
                }
                if(this.data.id.charAt(2)){
                    this.setImage('resources/numbers/num_kyellow_'+ this.data.id.charAt(2)+'.png',this.leftText3);
                }else{
                    this.leftText3.node.opacity = 0;
                    this.leftText3.node.active = false;
                }
            }else if (this.type == "small_btn"){
                url = 'resources/K3/small_btn_bg_down.png';
                skin =   this.data.downSkinName;
            }
          
           color = new cc.Color(255, 255, 0);
          
        }else{
            if(this.type == "long_long_btn"){
                url = 'resources/K3/long_long_btn_bg_def.png';
                skin =  this.data.defSkinName;

           }else if(this.type == "long_btn"){
                url =  'resources/K3/long_btn_bg_def.png';
                skin =  this.data.defSkinName;
            }else if(this.type == "middle_btn"){
                url = 'resources/K3/middle_btn_bg_def.png';
                skin = 'resources/numbers/num_white_'+ this.data.id.charAt(0)+'.png';
                if(this.data.id.charAt(1)){
                    this.setImage('resources/numbers/num_white_'+ this.data.id.charAt(1)+'.png',this.leftText2);
                }else{
                    this.leftText2.node.opacity = 0;
                    this.leftText2.node.active = false;
                } 
                if(this.data.id.charAt(2)){
                    this.setImage('resources/numbers/num_white_'+ this.data.id.charAt(1)+'.png',this.leftText3);
                }else{
                    this.leftText3.node.opacity = 0;
                    this.leftText3.node.active = false; 
                    
                }
                 
            }else if (this.type == "small_btn"){
                url = 'resources/K3/small_btn_bg_def.png';
                skin =  this.data.defSkinName;
            }
          
           color = new cc.Color(255, 255, 255);
        }

        if(this.data.id.length == 1){
            this.leftText.node.x = 30;
        }if(this.data.id.length ==2){
            this.leftText.node.x = 25;
            this.leftText2.node.x = 40;
        }
        if(!this.data.hasOwnProperty("rightText")  && this.type == "middle_btn"){
            this.leftText.node.y = 15;
            this.leftText2.node.y = 15;
            this.leftText3.node.y = 15;
        }
        this.setImage(url,this.bg);
        this.setImage(skin,this.leftText);
        if(this.rightText)this.rightText.node.color = color ;
    },
   
    setImage: function (url,comp) {
        var newSF = new cc.SpriteFrame(cc.textureCache.addImage(cc.url.raw(url)), cc.Rect(0, 0, 0, 0));
        comp.getComponent(cc.Sprite).spriteFrame = newSF;
    },
    
});
