//constructor Door 

// door draw 

// door open 

function Door (ctx) {
    this.ctx = ctx;
    this.x = this.ctx.canvas.width - 5;
    this.y = this.ctx.canvas.height/2;
    
    this.w = 30;
    this.h = 150;

    

}


Door.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.closePath();
  };
// checkCrossDoor: (player-door): { draw new bg}