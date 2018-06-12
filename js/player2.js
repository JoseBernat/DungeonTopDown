//constructor Player:
function Player(ctx) {
    this.ctx = ctx;
  
    this.w = 100
    this.h = 100
    this.x0 = 0
    this.x = 250
    this.y0 = (this.ctx.canvas.height * 0.93) - this.h;
    this.y = 200
    
    this.vx = 0;
    this.vy = 0;

    this.frames = 8;
    this.frameIndex = 0;
    this.framesCounter = 0;
    this.animateEvery = 6;
    
    //this.direction //= 'N' || 'S' || 'E' || 'W' //('north' ||'south'||'east'||'west')
    this.canDie = false
    this.isHitting= false 
   // console.log(this.canDie);
    

    this.img = new Image();
    this.img.src = 'img/player/walkNorth.png'//default
    //function (){
    //     // check hit
    //     //if this.hit = false
    //     if(this.direction = 'N'){
    //         return 
    //     }else if (this.direction = 'S'){
    //         return 'img/player/WalkSouth.png'
    //     }else if (this.direction = 'E'){
    //         return 'img/player/WalkEast.png'
    //     } else if (this.direction = 'W'){
    //         return 'img/player/Walkwest.png'
    //     }
    // }


    
    this.hittingBoundaries = false;

    this.drawCount = 0;
  

    this.damage = 0
  
    this.health = 30;
    console.log (this.health)
  }
  
 // draw player:
 Player.prototype.draw = function() {
   this.ctx.drawImage(
     this.img,
     this.x,
     this.y,
     this.w,
     this.h
   )

   this.framesCounter++;
   this.hittingCounter ++
   if (this.hittingCounter % 5 === 0) {
    this.isHitting = false;
    this.hittingCounter = 0;
   }
   //console.log(this.framesCounter, this.frameIndex)
 }

 Player.prototype.animate = function () {
   if(this.direction === 'N') {
      this.ctx.drawImage(
        this.img,
        this.frameIndex * Math.floor(this.img.width / this.frames),
        0,
        this.img.width / this.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
    )
   } else if (this.direction === 'S') {
    this.ctx.drawImage(
      
      this.img,
      this.frameIndex * Math.floor(this.img.width / this.frames),
      0,
      this.img.height,
      this.img.width/this.frames,
      this.x,
      this.y,
      this.w,
      this.h
  )

   } else if(this.direction = 'E'){
    this.ctx.drawImage(
      this.img,
      this.frameIndex * Math.floor(this.img.width / this.frames),
      0,
      this.img.width / this.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
  )
   } else if (this.direction = 'W'){
    this.ctx.drawImage(
      this.img,
      this.frameIndex * Math.floor(this.img.height / this.frames),
      0,
      this.img.width / this.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
  )
   }

   if (this.framesCounter % this.animateEvery === 0) {
    this.frameIndex += 1;

    if (this.frameIndex >= this.frames) {
      this.frameIndex = 0;
    }

    this.framesCounter = 0;
  }
 }
 
 Player.prototype.move = function() {
     this.checkBoundaries();
     this.animate();
     this.x += this.vx;
     this.y += this.vy;
 }

Player.prototype.checkBoundaries = function() {
  if (this.x <= 0) this.x = 0;
  if (this.x + this.w >= this.ctx.canvas.width) this.x = this.ctx.canvas.width - this.w;
  if (this.y <= 0) this.y = 0;
  if (this.y + this.h >= this.ctx.canvas.height) this.y = this.ctx.canvas.height - this.h;
}


Player.prototype.TOP = 38;
Player.prototype.DOWN = 40;
Player.prototype.LEFT = 37;
Player.prototype.RIGHT = 39;
Player.prototype.HIT = 32;

Player.prototype.hit = function () {
  console.log('Player hit state was: ' + this.isHitting)
  this.isHitting = true;
  this.hittingCounter = 0
  console.log('Player state is now: ' + this.isHitting)
 // clearInterval(myAttack);
}

Player.prototype.onKeyDown = function(code) {
  switch(code) {
    case this.HIT:
     
     this.hit();
     
     //this.canDie = true ;console.log(this.canDie)
     break;

    case this.TOP:
    
    if(!this.isHitting){
        this.frames = 8;
        this.img.src = 'img/player/walkNorth.png'
        this.vy = -3;     
      }else {
        this.frames = 8;
        this.img.src = 'img/player/hitNorth.png'
        this.vy = 0;   
      }
      break;
      
    case this.DOWN:
    
      if(!this.isHitting){
        this.frames = 8;
        this.img.src = 'img/player/walkSouth.png'
         this.vy = 3

      }else {
        this.frames = 8;
        this.img.src = 'img/player/hitSouth.png'
         this.vy = 0
      }
     break;

    case this.RIGHT:
    console.log(this.canDie)
    if(!this.isHitting){
      this.frames = 8
      this.img.src = 'img/player/walkEast.png'
      this.vx = 3;

    }else {
      this.frames = 8;
      this.img.src = 'img/player/hitEast.png'
      this.vx = 0;
    }
      break;

    case this.LEFT:
    
    if(!this.isHitting){
      this.frames = 8
      this.img.src = 'img/player/walkWest.png'
      this.vx = -3;

    }else {
      this.frames = 8;
      this.img.src = 'img/player/hitWest.png';
      this.vx = 0

    }
      break;


  }
};

Player.prototype.onKeyUp = function(code) {
  switch(code) {
    case this.RIGHT:
    case this.LEFT:
      this.vx = 0;
      break;
    case this.TOP:
    case this.DOWN:
      this.vy = 0;
    //case this.HIT:
     // this.isHitting = false;
  }

}

Player.prototype.checkCollitions = function(army) {
  var collitions = army.filter(function(enemy) {
    return enemy.collide(this); // paso el player
  }.bind(this));

  collitions.forEach(function(enemy) {
    
      this.checkEnemyCollition(enemy);
  }.bind(this));

  

  return collitions;


}

Player.prototype.checkEnemyCollition = function(enemy) {
  if(this.isHitting){
    enemy.health -= 1
  }else if(this.tickRateCounter % 50 === 0){
            this.player.health -= 1;
            this.tickRateCounter = 0;
  }
  
}
  //player onKeyDown:player move, shoot (arrow):{draw arrow, move arrow, splice this.arrows}, plant (bomb){}




 //player onKeyUp: stop move

 //clear player

 //checkCollisions (wall-player) {limit player move}