import { getCarousel } from '$lib/sanity/queries'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const carousel = await getCarousel()
  return {
    carousel
  }
}
