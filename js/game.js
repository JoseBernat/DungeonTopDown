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

    this.setKeyboardListeners();
    console.log(this.army)
}

Game.prototype.start = function () {
    if (!this.intervalId) {
        this.intervalId = setInterval(function () {
            this.clear();
            this.drawAll();
            this.moveAll();
            this.checkCollitions();
            this.changeRoom();
            this.checkGameOver();
           this.resolveCombat();
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

Game.prototype.moveAll = function (action) {
    this.player.move();
    this.army.move(this.enemy);
}

Game.prototype.changeRoom = function () {

    // if (this.EnemyArmy.enemies.length = 0){

    // }

    if (this.player.x + this.player.w >= this.door.x &&
        this.player.y + this.player.h >= this.door.y &&
        this.player.y <= this.door.y + this.door.h &&
        this.player.x <= this.door.x + this.door.w
    ) {
        this.player.x = this.ctx.canvas.width / 2
        this.player.y = this.ctx.canvas.height / 2
    }

}

Game.prototype.checkCollitions = function() {
    var collitions = this.player.checkCollitions(this.army.enemies);
    this.army.clean();
}

Game.prototype.resolveCombat = function () {
    var collitions = this.player.checkCollitions(this.army.enemies);
    collitions.forEach(function(item, index,) {
       console.log('ITEM --> ', item, index)
       this.tickRateCounter++;
        if (this.player.isHitting) {
            console.log("HIT!!!")
            item.health -= 1;
        } else if(this.tickRateCounter % 150 === 0){
            console.log(this.player.health)
            this.player.health -= 1;
            this.tickRateCounter = 0;
        }
    }.bind(this));
    this.army.clean();
}

Game.prototype.checkGameOver = function () {
    if (!this.player.health){
        
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