/* ===============================
   OOP CONFETTI SYSTEM
   (Encapsulation + Inheritance + Polymorphism + Abstraction)
================================ */

/* ABSTRACT BASE CLASS */
class Drawable {
    constructor(ctx) {
        this.ctx = ctx;
    }
    draw() {
        throw "draw() must be overridden";
    }
}

/* CONFETTI PIECE (ENCAPSULATION – properties hidden inside class) */
class ConfettiPiece extends Drawable {
    constructor(ctx) {
        super(ctx);
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * -50;
        this.size = Math.random() * 10 + 6;
        this.speed = Math.random() * 2 + 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() * 4) - 2;
    }

    randomColor() {
        const colors = ["#ff4b4b", "#ffb84d", "#4dd0ff", "#7aff4d", "#d64dff"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.rotation * Math.PI) / 180);

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        this.ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;

        if (this.y > window.innerHeight) {
            this.y = Math.random() * -20;
        }
    }
}

/* MANAGER CLASS (POLYMORPHISM – can manage any Drawable) */
class ConfettiManager {
    constructor() {
        this.canvas = document.getElementById("confettiCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.pieces = [];
        for (let i = 0; i < 140; i++) {
            this.pieces.push(new ConfettiPiece(this.ctx));
        }

        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pieces.forEach(piece => {
            piece.update();
            piece.draw();
        });

        requestAnimationFrame(this.animate.bind(this));
    }
}

/* START CONFETTI */
window.onload = () => {
    new ConfettiManager();
};
