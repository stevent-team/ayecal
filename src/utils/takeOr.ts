/**
 * Returns the value if it's not undefined, otherwise returns the fallback
 */
const takeOr = <TValue, TFallback>(value: TValue, fallback: TFallback) => value === undefined ? fallback : value

export default takeOr
