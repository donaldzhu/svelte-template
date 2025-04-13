import { generate } from 'random-words'

export const load = () => ({
  drag: {
    items: generate(80)
  }
})