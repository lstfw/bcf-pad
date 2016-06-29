cc.Class({
    extends: cc.Component,

   properties: {
       horizontalBar: {
           type: cc.ProgressBar,
           default: null
       },
     
    },


    // use this for initialization
    onLoad: function () {
        this.isLoad = false;
    },

 update: function (dt) {
        this._updateProgressBar(this.horizontalBar, dt);
    },
    
  
    _updateProgressBar: function(progressBar, dt){
        var progress = progressBar.progress;
        if(progress < 1.0){
            progress += dt*0.5;
        }
        else {
            if(this.isLoad == false){
               cc.director.loadScene('main');
               this.isLoad = true;
            }
        }
         progressBar.progress = progress;
    }
});
