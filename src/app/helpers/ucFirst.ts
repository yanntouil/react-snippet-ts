/**
 * Capitalize the first character of a string
 * @param {string} string
 * @return {string}
 */
// @ts-ignore
export const ucFirst = ([ first, ...rest ]: string): string => first.toLocaleUpperCase() + rest.join('')
