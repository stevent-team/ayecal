import crypto from 'node:crypto'

/**
 * Generate a UUID for identifying a calendar component.
 */
const generateUUID = () => crypto.randomUUID()

export default generateUUID

// TODO: Polyfill for insecure contexts/unsupported environments
