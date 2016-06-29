cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },

        progressTips: {
            default: null,
            type: cc.Label
        },
        currentScene:cc.Scene
    },

    onLoad: function () {
       this.progressBar.progress = 0;
    },
    
    loadScene:function (sceneName) {
      cc.loader.loadRes('scene/'+sceneName+".fire",this._completeCallback.bind(this));   
    },
    
    _completeCallback: function (error, res) {
        this.progressTips.string = "100%";
        this.currentScene = res.scene;
       // cc.director.runScene(res.scene);
         cc.director.loadScene(res.name);
    },

    update: function (dt) {
         var progress = this.progressBar.progress;
        if( this.currentScene == null){
            progress += 0.2;
            if(progress>=1){
                progress = 0.8
              }
          this.progressTips.string = parseInt(progress*100)+"%";
        }else{
            progress = 1;  
            this.progressTips.string = "100%";
            //this.progressBar.node.active = false;
            //this.enabled = false; 
        }
        this.progressBar.progress = progress;
    }
});
