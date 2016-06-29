cc.Class({
    extends: cc.Component,

    properties: {
        phoneEditBox:cc.EditBox,
        yzmEditBox:cc.EditBox,
        pwd1EditBox:cc.EditBox,
        pw2EditBox:cc.EditBox,
        userNameEditBox:cc.EditBox,
        numEditBox:cc.EditBox
    },


   onLoad: function () {

        cc.log("REGISTER");
    },
    
    getYZM:function () {
        
    },
    rigister: function () {
        
    },
    
   show: function () {
        this.node.emit('fade-in');
      
    },

    hide: function () {
        this.node.emit('fade-out');
    },
});
