import _ from 'lodash'
import type { p5 } from 'p5-svelte'


export interface SketchSettings {
  name: string
  min: number
  max: number
  value: number
  step?: number
}

abstract class Sketch {
  abstract settings: SketchSettings[]
  abstract readonly defaultSettings: SketchSettings[]
  shouldClear = false

  constructor() {
    this.shouldClear = false
  }

  draw(p5: p5) {
    if (this.shouldClear) {
      p5.background(255)
      this.shouldClear = false
    }
  }

  clear() {
    this.shouldClear = true
  }

  reset() {
    this.settings = _.cloneDeep(this.defaultSettings)
  }

  getSettingValues() {
    return this.settings.map(setting => setting.value)
  }
}

export default Sketch
