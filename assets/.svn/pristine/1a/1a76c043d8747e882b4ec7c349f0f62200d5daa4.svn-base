const RigisterUI = require('RigisterUI');
cc.Class({
    extends: cc.Component,

    properties: {
        rigisterUI: {
            default: null,
            type: RigisterUI
        },
        
        userNameEditBox:cc.EditBox,
        pwdEditBox: cc.EditBox
        
    },
    
    onLoad: function () {
        cc.log(" login");
    },

   login: function name() {
       var userName = this.userNameEditBox.string;
       var pwd = this.pwdEditBox.string;
       cc.log("userName:"+ userName + "pwd : "+ pwd);
   },
   
   show: function () {
        this.node.emit('fade-in');
      
    },

    hide: function () {
        this.node.emit('fade-out');
    },
});
