import _ from 'lodash'
import type { p5 } from 'p5-svelte'
import Sketch from '../sketch'

const defaultSettings = [
  {
    name: 'distance',
    min: 1,
    max: 20,
    value: 10,
    step: 0.1,
  },
  {
    name: 'spring',
    min: 0.1,
    max: 2,
    value: 0.5,
  },
  {
    name: 'friction',
    min: 0.1,
    max: 0.5,
    value: 0.5,
  },
  {
    name: 'size',
    min: 10,
    max: 100,
    value: 25,
    step: 1,
  },
  {
    name: 'split',
    min: 0.1,
    max: 10,
    value: 2,
  },
]
class Sketch1 extends Sketch {
  settings = $state(_.cloneDeep(defaultSettings))
  readonly defaultSettings = defaultSettings
  private x = 0
  private y = 0
  private accelerationX = 0
  private accelerationY = 0
  private acceleration = 0
  private radius = 0
  private hasPressed = false
  private oldRadius = 0
  private oldX = 0
  private oldY = 0

  constructor() {
    super()
    this.x = 0
    this.y = 0
    this.accelerationX = 0
    this.accelerationY = 0
    this.acceleration = 0
    this.radius = 0
    this.hasPressed = false
    this.oldRadius = 0
    this.oldX = 0
    this.oldY = 0
  }

  draw(p5: p5) {
    super.draw(p5)
    const [distance, spring, friction, size, split] = this.getSettingValues()

    this.oldRadius = this.radius

    if (!p5.mouseIsPressed) {
      this.hasPressed = false
      this.accelerationX = this.accelerationY = 0
      return
    }

    if (!this.hasPressed) {
      this.hasPressed = true
      this.x = p5.mouseX
      this.y = p5.mouseY
    }

    this.accelerationX += (p5.mouseX - this.x) * spring
    this.accelerationY += (p5.mouseY - this.y) * spring
    this.accelerationX *= friction
    this.accelerationY *= friction
    this.acceleration += Math.sqrt(this.accelerationX * this.accelerationX + this.accelerationY * this.accelerationY) - this.acceleration
    this.acceleration *= 0.6
    this.radius = size - this.acceleration

    for (let i = 0; i < distance; ++i) {
      this.oldX = this.x
      this.oldY = this.y
      this.x += this.accelerationX / distance
      this.y += this.accelerationY / distance
      this.oldRadius += (this.radius - this.oldRadius) / distance
      if (this.oldRadius < 1) this.oldRadius = 1
      p5.push()
      p5.strokeWeight(this.oldRadius + split)
      p5.line(this.x, this.y, this.oldX, this.oldY)
      p5.strokeWeight(this.oldRadius)
      p5.line(this.x + split * 2, this.y + split * 2, this.oldX + split * 2, this.oldY + split * 2)
      p5.line(this.x - split, this.y - split, this.oldX - split, this.oldY - split)
      p5.pop()
    }
  }
}

export default Sketch1
