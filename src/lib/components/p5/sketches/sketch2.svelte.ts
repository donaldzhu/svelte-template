import _ from 'lodash'
import Sketch from '../sketch'
import type { p5 } from 'p5-svelte'


const defaultSettings = [
  {
    name: 'min radius',
    min: 0.1,
    max: 25,
    value: 5,
    step: 0.1,
  },
  {
    name: 'density',
    min: 20,
    max: 200,
    value: 100,
    step: 1,
  },
  {
    name: 'lerps',
    min: 1,
    max: 100,
    value: 10,
    step: 1,
  },
]

class Sketch2 extends Sketch {
  settings = $state(_.cloneDeep(defaultSettings))
  readonly defaultSettings = defaultSettings

  draw(p5: p5) {
    super.draw(p5)
    if (!p5.mouseIsPressed) return
    p5.push()
    p5.stroke(0, 0, 0, 255)
    p5.strokeWeight(1)

    const { mouseX, mouseY, pmouseX, pmouseY } = p5
    const speed = Math.abs(mouseX - pmouseX) + Math.abs(mouseY - pmouseY)
    const [minRadius, density, lerps] = this.getSettingValues()
    const r = speed + minRadius
    const rSquared = r * r

    for (let i = 0; i < lerps; i++) {
      const lerpX = p5.lerp(pmouseX, mouseX, i / lerps)
      const lerpY = p5.lerp(pmouseY, mouseY, i / lerps)
      for (let ii = 0; ii < density; ii++) {
        const randX = p5.random(-r, r)
        const randY = p5.random(-1, 1) * Math.sqrt(rSquared - randX * randX)
        p5.point(lerpX + randX, lerpY + randY)
      }
    }
    p5.pop()
  }
}

export default Sketch2
