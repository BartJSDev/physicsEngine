class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = randomRange(5, 10);
        this.color = color;
        this.life = 1; // from 1 to 0
        this.velocity = {
            x: randomRange(-3,3),
            y: randomRange(-3,3)
        };
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life -= 0.02;
    }

    draw() {

        var gradient = c.createRadialGradient(this.x - this.size / 5, this.y - this.size / 5, this.size / 50, this.x, this.y, this.size * .6)

        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "black")

        c.beginPath()
        c.fillStyle = gradient
        c.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI)
        c.fill()
        c.closePath()
    }
}