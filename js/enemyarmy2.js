//constructor EnemyArmy 2


function EnemyArmy(ctx) {
    this.ctx = ctx;
  
    this.enemies = [];
  
    this.drawCounter = 0;
  } 
  //EnemyArmy draw: prototype = drawcounter++, addToArmy, this.enemies.forEach e, draw e, clean
  EnemyArmy.prototype.draw = function(enemyObject) {
    this.drawCounter++;

    this.enemies.forEach(function(e) {
      e.draw();
    });
  
    if(this.drawCounter % 100 === 0) {
      this.addToArmy();
      this.drawCounter = 0;
    }
    
   // this.cleanEnemies();
  };
  //EnemyArmy move =this.enemies.forEach(e) e.move;
  EnemyArmy.prototype.move = function(enemyObject) {
    this.enemies.forEach(function(e) {
      e.move();
    });
  };
  
 
  
  EnemyArmy.prototype.addToArmy = function() {
    var max = 4;
      
    if(this.enemies.length < max) {
      this.enemies.push(new Enemy(this.ctx, this.enemies.length));
    }
    
  };

 
  EnemyArmy.prototype.clean = function() {
    this.enemies.filter(function(e){
      return e.health > 0;
    })
   
  };
    //this.obstacles = this.obstacles.filter(this.isAlive);
  
  