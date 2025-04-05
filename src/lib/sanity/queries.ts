import type { Image } from '@sanity/types'
import groq from 'groq'

import { client } from './client'

export const getCarousel = async (): Promise<Image[]> => await client.fetch(groq`(*[_id == "carousel"].items)[0]`)
