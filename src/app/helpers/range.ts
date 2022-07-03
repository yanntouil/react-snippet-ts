
/**
 * Range return an array of number between from and to incremented by step
 * @param {number} from
 * @param {number} to
 * @param {number} [step=1]
 * @return {number[]} 
 */
export const range = (from: number, to: number, step: number = 1): number[] => {
    let i = from
    const range: number[] = []
    while (i <= to) {
        range.push(i)
        i += step
    }
    return range
}
