/**
 * Modulo function that always returns a positive number
 * @param a The number to be modulated
 * @param n The number to modulate by
 * @returns 
 */
export function mod(a: number, n: number): number {
    return ((a % n) + n) % n;
}

/**
 * The same as Math.random() but with a min and max
 * @param min The minimum number to return
 * @param max The maximum number to return
 * @returns The random number
 */
export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Loops a number between a min and max
 * @param min The minimum number to return
 * @param max The maximum number to return
 * @param at The number to loop
 * @returns The looped number
 */
export function loop(min: number, max: number, at: number): number {
    let diff = max - min;
    at = mod(at, diff);

    return at + min;
}

/**
 * A number or a range of numbers
 */
export type NumOrRange = number | [number, number];

/**
 * Returns a random number from a range
 * @param range The range to get a random number from
 * @returns The random number
 */
export function randomRange(range: NumOrRange): number {
    if (Array.isArray(range)) {
        return random(range[0], range[1]);
    }
    return range;
}
