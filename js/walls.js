// Constructor walls

function Walls(ctx) {
    this.ctx = ctx;
  
    this.w = this.ctx.canvas.width / 100;
    this.h = this.w;
    this.x0 = 0
    this.x = this.w * 2;
    this.y0 = (this.ctx.canvas.height * 0.93) - this.h;
    this.y = this.y0;
    
    this.vx = 0;
    this.vy = 0;
    
    
    this.img = new Image();
    this.img.src = "img/";
   
    
  
    
  }

//draw walls:


//check collisions (bullet-wall) {bullet bounce}

