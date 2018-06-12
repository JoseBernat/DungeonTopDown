function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    this.bg = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.door = new Door(this.ctx);
    this.enemy = new Enemy(this.ctx);
    this.army = new EnemyArmy(this.ctx);

    this.intervalId = undefined;
    this.fps = 60;
    this.tickRateCounter = 0;
    
    this.score = 0;
    this.level = 1;
    this.difficulty = 1;
    this.equaliser = -2

    this.difficultyModifier = (this.level + this.difficulty) - this.equaliser
    
    this.setKeyboardListeners();
    // console.log(this.army.enemies.indexOf(this.army.enemies[2]))
}

Game.prototype.increaseDifficulty = function () {
    this.army.difficultyModifier = this.difficultyModifier
}

Game.prototype.start = function () {
    if (!this.intervalId) {
        this.intervalId = setInterval(function () {
      
            
            this.clear();
            this.drawAll();
            this.moveAll();
            this.checkCollitions();
            this.resolveCombat();
            console.log(this.difficultyModifier, this.army.difficultyModifier)
            //this.checkCanDie(); TODO : canDie is true
            
            this.checkChangeRoom();
            
            this.checkGameOver();
        }.bind(this), 1000 / this.fps);
    }
}

Game.prototype.drawAll = function (action) {
    this.bg.draw();
    this.player.draw();
    this.door.draw();
    this.army.draw(this.enemy);
}

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
}

Game.prototype.resolveCombat = function () {
    var collitions = this.player.checkCollitions(this.army.enemies);
    
    collitions.forEach(function(enemy, index) {
        this.tickRateCounter++;
      //  console.log(this.player.canDie)
        
        if (this.player.isHitting) {        
            enemy.health -= 1;
            this.score ++;
            this.army.enemies = this.army.enemies.filter(function(e){
                return e.health >= 0;
                console.log(this.army.enemies.length)
                debugger;
            })
            
        } else if(this.tickRateCounter % 6000 === 0){
            this.player.health -= 1;
            this.tickRateCounter = 0;
            
        }
    }.bind(this));
}
Game.prototype.checkCanDie = function () {//TODO: canDie is automatically set to true
    if (this.player.canDie = true){
        this.resolveCombat();
    };
}

Game.prototype.moveAll = function (action) {
    this.player.move();
    this.army.move(this.enemy);
}

Game.prototype.checkChangeRoom = function () {
    //console.log(this.army.enemies.length)
    if(this.army.enemies.length === 0){
        if (this.player.x + this.player.w >= this.door.x &&
    
            this.player.y + this.player.h >= this.door.y &&
            this.player.y <= this.door.y + this.door.h &&
            this.player.x <= this.door.x + this.door.w
        ) {//TODO: Infinite loop, no changeRoom()
            // if (confirm("Congratulations! Did that seem too easy? How about a greater challenge for the next room?")) {
            //     this.difficulty +=5;
            //     this.level ++;
            //     this.changeRoom(2);
            // }else {
            //     this.difficulty ++;
            //     this.level ++;
            //     this.changeRoom (2);
            // }
         var nextLevel = this.level++;
         this.changeRoom(nextLevel);
        }
    }
}

Game.prototype.changeRoom = function (nextRoom) {//TODO: no changeRoom()
    //new bg draw (change source)
    console.log('level: ' + this.level)
    this.increaseDifficulty();
    this.player.x = this.ctx.canvas.width/2
    this.player.y = this.ctx.canvas.height/2
    

    switch(nextRoom) {
        case 2: 
        this.army.addToArmy(4);
        break;

        case 3:
        this.army.addToArmy(10);
        break;

        case 4:
        this.army.addToArmy(this.army.difficultyModifier);
        break;

    }

}

Game.prototype.checkCollitions = function() {
    var collitions = this.player.checkCollitions(this.army.enemies);
    this.army.clean();
}



Game.prototype.checkGameOver = function () {
    if (this.player.health <= 0){
        this.gameOver();
    }
}

Game.prototype.gameOver = function (){
    clearInterval(this.intervalId);

    if (confirm("GAME OVER! Play again?")) {
      location.reload();
    }
}

Game.prototype.setKeyboardListeners = function () {
    document.onkeydown = function (event) {
        this.player.onKeyDown(event.keyCode);
    }.bind(this)

    document.onkeyup = function (event) {
        this.player.onKeyUp(event.keyCode);
    }.bind(this)
}