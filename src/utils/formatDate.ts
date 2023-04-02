const formatDate = (date: Date) => {
  const iso = date
    .toISOString()
    .replace(/\..*/, '')
    .replace(/[^a-zA-Z0-9]/g, '')
  return `${iso}Z`
}

export default formatDate
