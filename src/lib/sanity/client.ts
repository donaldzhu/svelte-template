import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId, studioUrl } from '$lib/sanity/api'


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl
  }
})
