import imageUrlBuilder from '@sanity/image-url'

import { client } from './client'
import type { Image } from '@sanity/types'

const builder = imageUrlBuilder(client)

export const urlFor = (source: Image) => builder.image(source)
