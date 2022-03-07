const formatDate = date => {
  const iso = date
    .toISOString()
    .replace(/\..*/, '')
    .replace(/[^a-zA-Z0-9]/g, '')
  return `${iso}Z`
}

export default formatDate
