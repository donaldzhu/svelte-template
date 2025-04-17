import groq from 'groq'

import { client } from './client'
import type { Image } from '@sanity/types'

export const getCarousel = async (): Promise<Image[]> => await client.fetch(groq`(*[_id == "carousel"].items)[0]`)
