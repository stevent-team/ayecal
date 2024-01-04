const escapeText = (text: string) => {
  if (!text) return ''
  return text.replaceAll(',', '\\,').replaceAll('\n', '\\n').replaceAll("'", "\\'").replaceAll('"', '\\"')
}

export default escapeText
