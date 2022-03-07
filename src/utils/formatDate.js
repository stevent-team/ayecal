const formatDate = date => date
  .toISOString()
  .replace(/\..*/, '')
  .replace(/[^a-zA-Z0-9]/g, '')

export default formatDate
