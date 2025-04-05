import type { PageServerLoad } from './$types'
import { getCarousel } from '$lib/sanity/queries'

export const load: PageServerLoad = async () => {
  const carousel = await getCarousel()
  return {
    carousel
  }
}
