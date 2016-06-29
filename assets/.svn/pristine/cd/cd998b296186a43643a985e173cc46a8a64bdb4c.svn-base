cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        itemID: 0
    },

    updateItem: function(itemId, itemtext) {
       
        this.itemID = itemId;
        this.label.string = itemtext;
        
    },
    
    onLoad: function () {
       // cc.log("item is onLoad");
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
          //  console.log("itemId", this.label.string);
        })
    },
    
    
    
});
