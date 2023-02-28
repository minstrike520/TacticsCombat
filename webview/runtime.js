const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 500;
canvas.height = 1000;

const gravity = 0.2
const bouncing = 0.3

class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0-this.velocity.y*bouncing
        } else this.velocity.y += gravity;
    }
}

const player = new Sprite({
    position:{
        x: 50,
        y: 50
    },
    velocity:{
        x: 0,
        y: 0
    }
    
})

const enemy = new Sprite({
    position: {
        x: 200,
        y: 50
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player.draw();
enemy.draw();

let lastKey

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    }
}
function keypressing(){
    if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1
    } else if (keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    } else {
        player.velocity.x = 0
    }
    if (keys.w.pressed){
        player.velocity.y = -2
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    keypressing()
    player.update()
    enemy.update()
    
    //console.log("running")
}
animate()

function listener(){
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case "d":
                keys.d.pressed = true
                lastKey = "d"
                break
            case "a":
                keys.a.pressed = true
                lastKey = "a"
                break
            case "w":
                keys.w.pressed = true
                lastKey = "w"
                break
        }
        //console.log(event.key);
    })
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case "d":
                keys.d.pressed = false
                break
            case "a":
                keys.a.pressed = false
                break
            case "w":
                keys.w.pressed = false
        }
        //console.log(event.key);
    })    
}
listener()
