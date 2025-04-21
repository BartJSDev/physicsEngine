class Ball {

    constructor(x, y, size, color) {

        this.x = x
        this.y = y
        this.size = size
        this.color = color
        this.velocity = { x: 0, y: 0 }
        this.friction = .98
        this.spring = .02
        this.originPoint = { x: this.x, y: this.y }
        this.collided = false

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

    getBounds(x, y) {

        return x > this.x - this.size / 2 && x < this.x + this.size / 2 && y > this.y - this.size / 2 && y < this.y + this.size / 2
    }

    repel(x, y, r) {

        //calculate distance (x,y) - ball
        var dx = this.x - x
        var dy = this.y - y
        var dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < r) {

            var force = (r - dist) * this.spring
            var angle = Math.atan2(dy, dx)

            var forceX = Math.cos(angle) * force
            var forceY = Math.sin(angle) * force

            this.velocity.x += forceX
            this.velocity.y += forceY

        }

        // Spring back to origin
        let toOriginX = this.originPoint.x - this.x
        let toOriginY = this.originPoint.y - this.y
        this.velocity.x += toOriginX * this.spring
        this.velocity.y += toOriginY * this.spring

        // Apply friction/damping
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction

        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    springTo(x, y) {

        var dx = x - this.x
        var dy = y - this.y

        var accx = dx * this.spring
        var accy = dy * this.spring

        this.velocity.x += accx
        this.velocity.y += accy

        this.velocity.x *= this.friction
        this.velocity.y *= this.friction

        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}