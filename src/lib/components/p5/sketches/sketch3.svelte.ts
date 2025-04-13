import _ from 'lodash'
import type { Vector } from 'p5'
import type { p5 } from 'p5-svelte'
import Sketch from '../sketch'

const defaultSettings = [
  {
    name: 'min radius',
    min: 1,
    max: 10,
    value: 4,
  },
  {
    name: 'max radius',
    min: 1,
    max: 20,
    value: 8,
  },
  {
    name: 'x offset',
    min: 0,
    max: 10,
    value: 1,
  },
  {
    name: 'y offset',
    min: 0,
    max: 10,
    value: 1,
  },
  {
    name: 'reduction',
    min: 0,
    max: 1,
    value: 0.5,
  },
]

class Sketch3 extends Sketch {
  settings = $state(_.cloneDeep(defaultSettings))
  readonly defaultSettings = defaultSettings

  balls: Ball[]

  constructor() {
    super()
    this.balls = []
  }

  draw(p5: p5) {
    super.draw(p5)

    p5.push()
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].draw()
      this.balls[i].update()
    }

    this.balls = this.balls.filter(ball => ball.radius > 0)
    if (p5.mouseIsPressed) {
      const [minRadius, maxRadius, xOffset, yOffset, reduction] = this.getSettingValues()
      this.balls.push(new Ball(
        p5,
        minRadius,
        maxRadius,
        xOffset,
        yOffset,
        reduction,
      ))
    }
    p5.pop()
  }

  clear() {
    super.clear()
    this.balls = []
  }
}

class Ball {
  location: Vector
  radius: number
  xOffset: number
  yOffset: number

  nX: number
  nY: number

  constructor(
    private p5: p5,
    minRadius: number,
    maxRadius: number,
    xOffset: number,
    yOffset: number,
    private reduction: number,
  ) {
    this.location = p5.createVector(p5.mouseX, p5.mouseY)
    this.radius = p5.random(minRadius, maxRadius)

    this.nX = 0
    this.nY = 0

    this.xOffset = xOffset * p5.random(-1, 1)
    this.yOffset = yOffset * p5.random(-1, 1)
  }

  update() {
    this.radius -= this.reduction * this.p5.random(0.01, 0.3)

    this.xOffset = this.xOffset + this.p5.random(-.5, .5)
    this.nX = this.p5.noise(this.location.x) * this.xOffset

    this.yOffset = this.yOffset + this.p5.random(-.5, .5)
    this.nY = this.p5.noise(this.location.y) * this.yOffset

    this.location.x += this.nX
    this.location.y += this.nY
  }

  draw() {
    this.p5.noStroke()
    this.p5.fill(0)
    this.p5.ellipse(this.location.x, this.location.y, this.radius, this.radius)
  }
}

export default Sketch3
