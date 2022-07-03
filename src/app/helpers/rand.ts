/**
 * Return a random number between min and max
 * @param {number} min
 * @param {number} max
 * @return {number} 
 */
export const rand = (min: number, max: number): number => 
 min === 0 ? 
     Math.floor((Math.random() * max) + 0) : 
     Math.floor(Math.random() * (max - min + 1)) + min