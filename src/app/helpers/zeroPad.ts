/**
 * Pads a string value with leading zeroes until length is reached
 * ? Example: zeroPad(8, 3) => "008"
 * @param {string | number} value 
 * @param {number} [length = 2]
 * @returns {string}
 */
export const zeroPad = (value: string | number, length: number = 2): string => `${value}`.padStart(length, '0')