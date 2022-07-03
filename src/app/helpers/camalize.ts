/**
 * Camalize a string
 * @param {String}
 * @returns {String}
 */
export const camalize = (string: string): string => string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase())
