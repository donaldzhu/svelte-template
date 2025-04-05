import type { Image } from '@sanity/types'
import imageUrlBuilder from '@sanity/image-url'

import { client } from './client'

const builder = imageUrlBuilder(client)

export const urlFor = (source: Image) => builder.image(source)
