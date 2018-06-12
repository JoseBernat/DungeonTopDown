//constructor EnemyArmy 2


function EnemyArmy(ctx) {
    this.ctx = ctx;
  
    this.enemies = [];
  
    this.drawCounter = 0;

    this.difficultyModifier = 1

    this.addToArmy(this.difficultyModifier);

  } 
  //EnemyArmy draw: prototype = drawcounter++, addToArmy, this.enemies.forEach e, draw e, clean
  EnemyArmy.prototype.draw = function(enemyObject) {
    this.drawCounter++;
   // console.log(this.drawCounter);
    this.enemies.forEach(function(e) {
      e.draw();
    });
   }
    
   // this.cleanEnemies();

  //EnemyArmy move =this.enemies.forEach(e) e.move;
  EnemyArmy.prototype.move = function(enemyObject) {
    this.enemies.forEach(function(e) {
      e.move();
    });
  };
 
  
  EnemyArmy.prototype.addToArmy = function(num) {
    // if(this.difficultyModifier % 10){
      //   this.enemies.push(new Boss(
        //     this.ctx,
        //     xRandom,
        //     yRandom,
        //   ))
        // }
        for(var i = 0; i < num ; i++) {
          var xRandom =  Math.random() * (this.ctx.canvas.width - 100);
          var yRandom =  Math.random() * (this.ctx.canvas.height - 100);
        this.enemies.push(new Enemy(
          this.ctx, 
          xRandom, 
          yRandom, 
          
        )); 
      }
  }

 
  EnemyArmy.prototype.clean = function() {
      this.enemies.filter(function(e){
        return e.health > 0;
      }) 
  };
    //this.obstacles = this.obstacles.filter(this.isAlive);
  
  