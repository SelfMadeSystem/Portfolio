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
 * @param at The number to loop
 * @param min The minimum number to return
 * @param max The maximum number to return
 * @returns The looped number
 */
export function wrapNumber(at: number, min: number, max: number): number {
    return mod(at - min, max - min) + min;
}

/**
 * Wraps an angle between -180 and 180
 */
export function wrapAngle(angle: number): number {
    return wrapNumber(angle, -180, 180);
}

/**
 * Gets the shortest angle between two angles.
 * The result will be between -180 and 180.
 * It is negative if a2 is clockwise of a1 and positive if a2 is counter-clockwise of a1
 */
export function angleDistance(a1: number, a2: number): number {
    return wrapAngle(a2 - a1);
}

/**
 * Clamps a number between a min and max
 */
export function clamp(at: number, min: number, max: number): number {
    return Math.min(Math.max(at, min), max);
}

/**
 * Linearly interpolates between two numbers
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
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
export function randomRange(...args: [NumOrRange] | [number, number]): number {
    if (args.length == 1) {
        const range = args[0];
        if (Array.isArray(range)) {
            return random(range[0], range[1]);
        }
        return range;
    }
    return random(args[0], args[1]);
}

/**
 * Constant to convert degrees to radians
 */
export const DEG_TO_RAD = Math.PI / 180;

/**
 * Constant to convert radians to degrees
 */
export const RAD_TO_DEG = 180 / Math.PI;
