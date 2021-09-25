document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            console.log(this.enemies);
        }
        update() {
            this.enemies.forEach(object => object.update());
            this.#addNewEnemy();
        }
        draw() {
            this.enemies.forEach(object => object.draw());
        }
        #addNewEnemy() {
            this.enemies.push(new Enemy(this));
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.y = this.game.height * Math.random();
            this.width = 100;
            this.height = 100;
        }
        update() {
            this.x -= 1;
        }
        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update();
        game.draw();
        //console.log(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});