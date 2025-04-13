export const load = ({ url }) => ({
  sketchIndex: parseInt(url.searchParams.get('sketch') || '1') - 1
})
