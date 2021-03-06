// constructor Enemy 2
function Enemy(ctx, x, y, id) {
    this.ctx = ctx;
    this.id = id;
    this.isAlive = true
    this.health = 1;
    this.x = x;
    this.y = y;
    this.w = this.ctx.canvas.width / 10;
    this.h = this.w;
  
    this.vx = 1;
    this.vy = 1;
  
    this.img = new Image();
    this.img.src = "img/obstacle_" + Math.round(Math.random()) + ".png";
    this.difficultyModifier = 4
  }
  // enemy draw 

  Enemy.prototype.draw = function() {
    // this.ctx.fillStyle = "#FFFFFF";
    // this.ctx.font="20px Georgia";
    // this.ctx.fillText(this.id, this.x + (this.w/2), this.y - 20)

    this.ctx.drawImage(
      this.img,
      this.x,
      this.y, 
      this.w,
      this.h
    );
  };
  
// enemy checkboundaries:

Enemy.prototype.checkBoundaries = function() {
  if (this.x <= 0) this.vx = -this.vx;
  if (this.x + this.w >= this.ctx.canvas.width) this.vx = -this.vx;
  if (this.y <= 0) this.vy = -this.vy;
  if (this.y + this.h >= this.ctx.canvas.height) this.vy = -this.vy;
}

Enemy.prototype.move = function() {
  //this.directionCounter ++;

  // var randomA = this.randomBetween(-5, 5);
  // var randomB = this.randomBetween(-5, 5);
  // var randomC = this.randomBetween(-5, 5);
  // var randomD = this.randomBetween(-5, 5);
  // var randomTimer = this.randomBetween(1500, 4500);

  // if (this.directionCounter % randomTimer === 0){
  //   this.directionCounter = 0;
  //   this.vx = randomA - randomB;
    
  //   this.vy = randomC - randomD;
  //debugger
   // console.log('collide');
    this.x += this.vx; 
    this.y += this.vy;

    this.checkBoundaries();
  //}


  


   //  this.vx = this.randomDirection(-5, 5);
   //  this.vy = this.randomDirection(-5, 5);

   
}

Enemy.prototype.collide = function(object) {
  //true / false;
  //console.log (object.isHitting)
 // if(!object.isHitting){
    if ((this.x > object.x + object.w*2/3) //horizontal no reach
      ||(this.y + this.h < object.y + object.h/4) // vertical no reach
      ||(this.x + this.w < object.x + object.w/3)//horizontal pass
      ||(this.y > object.y + object.h*3/4)//vertical pass 
      ){
      return false
    } else {
    
      return true;
    }

  // } else {//TODO
  //   if ((this.x > object.x + object.w) //horizontal no reach
  //   ||(this.y + this.h < object.y + object.h) // vertical no reach
  //   ||(this.x + this.w < object.x + object.w)//horizontal pass
  //   ||(this.y > object.y + object.h)//vertical pass 
  //   ){
  //   return false
  // } else {
  //   debugger;
  //   return true;
  
}



Enemy.prototype.randomBetween = function(min, max) {
    return Math.random() * (max - min) + min;
};


// enemy shoot 


