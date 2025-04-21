let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

let balls = []
let particles = []
let mouse = { x: null, y: null }
let max_particles = 1000

draw()

function draw() {

    c.clearRect(0, 0, canvas.width, canvas.height)

    // Handle collisions before drawing
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            Checkcollisions(balls[i], balls[j])
        }
    }

    //ball motion
    balls.forEach(ball => {

        ball.springTo(canvas.width / 2, canvas.height / 2)
        ball.draw()

        if (!ball.collided) {

            // Emit particles
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(ball.x, ball.y, ball.color))
            }

        }else{

           ball.originPoint.x = ball.x 
           ball.originPoint.y = ball.y
           ball.repel(mouse.x , mouse.y , 1000)
        }

    

    })

    // Particle logic
    particles.forEach((p, i) => {
        p.update()
        p.draw()

        // Remove dead particles
        if (p.life <= 0) {
            particles.splice(i, 1)
        }
    })

    while (particles.length > max_particles) {
        particles.shift() // Remove oldest
    }

    requestAnimationFrame(draw)

}

function Checkcollisions(ballA, ballB) {

    let dx = ballB.x - ballA.x
    let dy = ballB.y - ballA.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let minDist = ballA.size / 2 + ballB.size / 2

    if (distance < minDist) {

        ballA.collided = true
        ballB.collided = true

        let overlap = minDist - distance
        let nx = dx / distance
        let ny = dy / distance

        // Push both balls away from each other proportionally
        let force = overlap * 0.5
        ballA.x -= nx * force
        ballA.y -= ny * force
        ballB.x += nx * force
        ballB.y += ny * force

        // Adjust velocity (mildly damped)
        ballA.velocity.x *= .2
        ballA.velocity.y *= .2
        ballB.velocity.x *= .2
        ballB.velocity.y *= .2
    }
}

addEventListener("mousemove", function (e) {

    mouse.x = e.clientX * devicePixelRatio
    mouse.y = e.clientY * devicePixelRatio
})

addEventListener("click", function (e) {

    var ball = new Ball(mouse.x, mouse.y, randomRange(100, 200), randomColor())
    ball.velocity.x = 150
    ball.velocity.y = 150
    balls.push(ball)
})

canvas.addEventListener("touchstart", function (e) {

    let touch = e.touches[0]
    let x = touch.clientX * devicePixelRatio
    let y = touch.clientY * devicePixelRatio
    var ball = new Ball(x , y, randomRange(50, 100), randomColor())
    ball.velocity.x = 150
    ball.velocity.y = 150
    balls.push(ball)
})